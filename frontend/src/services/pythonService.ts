import { loadPyodide, type PyodideInterface } from 'pyodide';
import type { ExecutionResult } from '@/types/console.types';
import type { TestCase, ValidationResult } from '@/types/challenge.types';

class PythonService {
  private pyodide: PyodideInterface | null = null;
  private initialized: boolean = false;
  private initPromise: Promise<void> | null = null;

  async initialize(): Promise<void> {
    if (this.initialized) return;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        console.log('Initializing Pyodide...');
        this.pyodide = await loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/',
        });

        // Setup stdout/stderr capture
        await this.pyodide.runPythonAsync(`
import sys
from io import StringIO

class CaptureIO:
    def __init__(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
    
    def reset(self):
        self.stdout = StringIO()
        self.stderr = StringIO()
    
    def get_stdout(self):
        return self.stdout.getvalue()
    
    def get_stderr(self):
        return self.stderr.getvalue()

_capture = CaptureIO()
sys.stdout = _capture.stdout
sys.stderr = _capture.stderr
        `);

        this.initialized = true;
        console.log('Pyodide initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Pyodide:', error);
        this.initPromise = null;
        throw error;
      }
    })();

    return this.initPromise;
  }

  async runCode(code: string): Promise<ExecutionResult> {
    await this.initialize();
    if (!this.pyodide) {
      throw new Error('Pyodide not initialized');
    }

    const startTime = performance.now();

    try {
      // Reset output capture
      await this.pyodide.runPythonAsync(`
_capture.reset()
sys.stdout = _capture.stdout
sys.stderr = _capture.stderr
      `);

      // Execute code
      const result = await this.pyodide.runPythonAsync(code);

      // Capture output
      const stdout = await this.pyodide.runPythonAsync('_capture.get_stdout()');
      const stderr = await this.pyodide.runPythonAsync('_capture.get_stderr()');

      const executionTime = performance.now() - startTime;

      return {
        success: true,
        output: stdout || (result !== undefined && result !== null ? String(result) : ''),
        error: stderr || null,
        result: result,
        executionTime,
      };
    } catch (error: any) {
      const executionTime = performance.now() - startTime;
      
      // Try to get stderr if available
      let stderr = '';
      try {
        stderr = await this.pyodide.runPythonAsync('_capture.get_stderr()');
      } catch (e) {
        // Ignore
      }

      return {
        success: false,
        output: '',
        error: stderr || error.message || 'An error occurred',
        result: null,
        executionTime,
      };
    }
  }

  async validateCode(code: string, testCases: TestCase[]): Promise<ValidationResult> {
    await this.initialize();
    
    const results = [];

    for (const testCase of testCases) {
      const testCode = `
${code}

# Test case: ${testCase.name}
${testCase.setup || ''}
try:
    assert ${testCase.assertion}, "${testCase.errorMessage}"
    _test_passed = True
except AssertionError as e:
    _test_passed = False
    _test_error = str(e)
except Exception as e:
    _test_passed = False
    _test_error = f"{type(e).__name__}: {str(e)}"
      `;

      const result = await this.runCode(testCode);
      
      let passed = false;
      let error = result.error;

      if (result.success) {
        try {
          passed = await this.pyodide!.runPythonAsync('_test_passed');
          if (!passed) {
            error = await this.pyodide!.runPythonAsync('_test_error');
          }
        } catch (e: any) {
          error = e.message;
        }
      }

      results.push({
        testCase: testCase.name,
        passed,
        error: error || undefined,
      });
    }

    return {
      allPassed: results.every(r => r.passed),
      results,
    };
  }

  async reset(): Promise<void> {
    if (this.pyodide) {
      try {
        // Clear all user-defined variables but keep our capture system
        await this.pyodide.runPythonAsync(`
# Get list of user-defined variables
user_vars = [k for k in globals().keys() if not k.startswith('_') and k not in ['sys', 'StringIO', 'CaptureIO']]
# Delete them
for var in user_vars:
    del globals()[var]
        `);
      } catch (error) {
        console.error('Error resetting Python environment:', error);
      }
    }
  }

  isInitialized(): boolean {
    return this.initialized;
  }

  async loadPackage(packageName: string): Promise<void> {
    await this.initialize();
    if (!this.pyodide) {
      throw new Error('Pyodide not initialized');
    }
    await this.pyodide.loadPackage(packageName);
  }
}

export const pythonService = new PythonService();
