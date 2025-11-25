import React, { useState, useEffect, useRef } from 'react';
import { pythonService } from '@/services/pythonService';
import type { ConsoleHistoryItem, ExecutionResult } from '@/types/console.types';
import { Loader2, Terminal, Trash2, Play } from 'lucide-react';

export const InteractiveConsole: React.FC = () => {
  const [code, setCode] = useState('');
  const [history, setHistory] = useState<ConsoleHistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Pyodide on component mount
    pythonService.initialize().then(() => {
      setIsInitializing(false);
    }).catch((error) => {
      console.error('Failed to initialize Python:', error);
      setIsInitializing(false);
    });
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom when new output is added
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  const handleRunCode = async () => {
    if (!code.trim() || isLoading || isInitializing) return;

    setIsLoading(true);
    
    try {
      const result = await pythonService.runCode(code);
      
      const historyItem: ConsoleHistoryItem = {
        id: Date.now().toString(),
        code,
        result,
        timestamp: new Date(),
      };

      setHistory(prev => [...prev, historyItem]);
      setCode('');
      setHistoryIndex(-1);
    } catch (error: any) {
      const errorResult: ExecutionResult = {
        success: false,
        output: '',
        error: error.message || 'An error occurred',
        result: null,
      };

      const historyItem: ConsoleHistoryItem = {
        id: Date.now().toString(),
        code,
        result: errorResult,
        timestamp: new Date(),
      };

      setHistory(prev => [...prev, historyItem]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Execute on Shift+Enter
    if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      handleRunCode();
      return;
    }

    // Navigate history with up/down arrows
    if (e.key === 'ArrowUp' && code === '' && history.length > 0) {
      e.preventDefault();
      const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
      setHistoryIndex(newIndex);
      setCode(history[history.length - 1 - newIndex].code);
    }

    if (e.key === 'ArrowDown' && historyIndex >= 0) {
      e.preventDefault();
      const newIndex = historyIndex > 0 ? historyIndex - 1 : -1;
      setHistoryIndex(newIndex);
      setCode(newIndex >= 0 ? history[history.length - 1 - newIndex].code : '');
    }
  };

  const handleClear = () => {
    setHistory([]);
    setCode('');
    setHistoryIndex(-1);
  };

  const handleReset = async () => {
    await pythonService.reset();
    handleClear();
  };

  return (
    <div className="flex flex-col h-full bg-gray-900 text-gray-100 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-green-400" />
          <span className="font-semibold">Python Console</span>
          {isInitializing && (
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Loader2 className="w-3 h-3 animate-spin" />
              Initializing...
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleReset}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors"
            title="Reset environment"
            disabled={isInitializing}
          >
            Reset
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded transition-colors flex items-center gap-1"
            title="Clear console"
          >
            <Trash2 className="w-3 h-3" />
            Clear
          </button>
        </div>
      </div>

      {/* Output Area */}
      <div
        ref={outputRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 font-mono text-sm"
      >
        {history.length === 0 && (
          <div className="text-gray-500 italic">
            <p>Python {isInitializing ? 'is loading...' : 'is ready'}. Type your code below and press Shift+Enter to execute.</p>
            <p className="mt-2">Try: <code className="text-green-400">print("Hello, Python!")</code></p>
          </div>
        )}

        {history.map((item) => (
          <div key={item.id} className="space-y-1">
            {/* Input */}
            <div className="flex gap-2">
              <span className="text-green-400 select-none">&gt;&gt;&gt;</span>
              <pre className="flex-1 whitespace-pre-wrap break-words text-gray-200">
                {item.code}
              </pre>
            </div>

            {/* Output */}
            {item.result.output && (
              <div className="pl-6 text-gray-300 whitespace-pre-wrap break-words">
                {item.result.output}
              </div>
            )}

            {/* Error */}
            {item.result.error && (
              <div className="pl-6 text-red-400 whitespace-pre-wrap break-words">
                {item.result.error}
              </div>
            )}

            {/* Execution time */}
            {item.result.executionTime !== undefined && (
              <div className="pl-6 text-xs text-gray-500">
                Executed in {item.result.executionTime.toFixed(2)}ms
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-gray-400">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Executing...</span>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex gap-2">
          <span className="text-green-400 select-none pt-2">&gt;&gt;&gt;</span>
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter Python code... (Shift+Enter to run)"
              disabled={isInitializing || isLoading}
              className="w-full bg-transparent text-gray-200 font-mono text-sm outline-none resize-none"
              rows={3}
              autoFocus
            />
          </div>
          <button
            onClick={handleRunCode}
            disabled={isInitializing || isLoading || !code.trim()}
            className="self-start px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-700 disabled:text-gray-500 rounded transition-colors flex items-center gap-2"
            title="Run code (Shift+Enter)"
          >
            <Play className="w-4 h-4" />
            Run
          </button>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Press <kbd className="px-1 py-0.5 bg-gray-800 rounded">Shift+Enter</kbd> to execute
          {' • '}
          Use <kbd className="px-1 py-0.5 bg-gray-800 rounded">↑</kbd> / <kbd className="px-1 py-0.5 bg-gray-800 rounded">↓</kbd> to navigate history
        </div>
      </div>
    </div>
  );
};
