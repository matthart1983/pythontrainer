import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, BookOpen, CheckCircle, Play, RotateCcw, AlertCircle } from 'lucide-react';
import { pythonService } from '../services/pythonService';

interface Exercise {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  order: number;
}

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  difficulty: string;
  estimatedTime: number;
  topic: string;
  orderIndex: number;
  exercises: Exercise[];
}

export const LessonDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Console state
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [consoleError, setConsoleError] = useState<string | null>(null);
  
  // Exercise state
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [completedExercises, setCompletedExercises] = useState<Set<number>>(new Set());
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (slug) {
      fetchLesson(slug);
    }
  }, [slug]);

  useEffect(() => {
    // Load starter code when exercise changes
    if (lesson?.exercises && lesson.exercises.length > 0) {
      const currentExercise = lesson.exercises[currentExerciseIndex];
      if (currentExercise) {
        setCode(currentExercise.starterCode || '# Write your code here\n');
        setOutput('');
        setConsoleError(null);
        setShowHint(false);
        setShowSolution(false);
      }
    }
  }, [currentExerciseIndex, lesson]);

  const handleRunCode = async () => {
    setIsRunning(true);
    setConsoleError(null);
    
    try {
      const result = await pythonService.runCode(code);
      setOutput(result.output);
      
      if (result.error) {
        setConsoleError(result.error);
      } else {
        // Check if output matches expected result (basic validation)
        validateExercise(result.output);
      }
    } catch (err: any) {
      setConsoleError(err.message || 'Failed to run code');
    } finally {
      setIsRunning(false);
    }
  };

  const validateExercise = (executionOutput: string) => {
    if (!lesson?.exercises || lesson.exercises.length === 0) return;
    
    const currentExercise = lesson.exercises[currentExerciseIndex];
    if (!currentExercise) return;

    // Run solution code to get expected output
    pythonService.runCode(currentExercise.solution).then(solutionResult => {
      const normalizedOutput = executionOutput.trim().toLowerCase();
      const normalizedExpected = solutionResult.output.trim().toLowerCase();
      
      if (normalizedOutput === normalizedExpected) {
        // Mark exercise as complete
        const newCompleted = new Set([...completedExercises, currentExerciseIndex]);
        setCompletedExercises(newCompleted);
        
        // Check if all exercises are now complete
        const allComplete = lesson.exercises.every((_, idx) => newCompleted.has(idx));
        
        if (allComplete) {
          setOutput(prev => prev + '\n\n🎉 LESSON COMPLETED! You\'ve finished all exercises!\n✨ Great work! You\'re making excellent progress!');
        } else {
          const remaining = lesson.exercises.length - newCompleted.size;
          setOutput(prev => prev + `\n\n✅ Exercise ${currentExerciseIndex + 1} completed! ${remaining} exercise${remaining > 1 ? 's' : ''} remaining.`);
        }
      } else {
        setOutput(prev => prev + '\n\n❌ Output doesn\'t match expected result. Try again!');
      }
    });
  };

  const handleReset = () => {
    if (lesson?.exercises && lesson.exercises[currentExerciseIndex]) {
      setCode(lesson.exercises[currentExerciseIndex].starterCode || '');
      setOutput('');
      setConsoleError(null);
    }
  };

  const fetchLesson = async (lessonSlug: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/v1/lessons/${lessonSlug}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setLesson(data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching lesson:', err);
      setError(err.message || 'Failed to load lesson');
    } finally {
      setLoading(false);
    }
  };

  const parseSections = (content: string) => {
    // Split content by h2 headers (##)
    const parts = content.split(/(?=^## )/gm).filter(part => part.trim());
    return parts.map((part, index) => {
      const titleMatch = part.match(/^## (.+)$/m);
      const title = titleMatch ? titleMatch[1] : `Section ${index + 1}`;
      return { title, content: part };
    });
  };

  const formatContent = (content: string) => {
    // Convert markdown to HTML with better formatting
    let html = content;
    
    // Headers
    html = html.replace(/^---$/gm, '<hr />');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // Text formatting
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/`(.+?)`/g, '<code>$1</code>');
    
    // Code blocks
    html = html.replace(/```python\n([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    html = html.replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>');
    
    // Blockquotes
    html = html.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');
    
    // Lists - Convert bullet points to proper list items
    const lines = html.split('\n');
    let inList = false;
    const processed: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.match(/^- /)) {
        if (!inList) {
          processed.push('<ul>');
          inList = true;
        }
        processed.push('<li>' + line.substring(2) + '</li>');
      } else if (line.match(/^\d+\. /)) {
        if (!inList) {
          processed.push('<ol>');
          inList = true;
        }
        processed.push('<li>' + line.substring(line.indexOf('. ') + 2) + '</li>');
      } else {
        if (inList) {
          processed.push('</ul>');
          inList = false;
        }
        processed.push(line);
      }
    }
    
    if (inList) {
      processed.push('</ul>');
    }
    
    html = processed.join('\n');
    
    // Split into lines and wrap each non-empty line that's not already HTML in a paragraph
    const finalLines = html.split('\n');
    const paragraphed: string[] = [];
    
    for (let i = 0; i < finalLines.length; i++) {
      const line = finalLines[i].trim();
      
      // Skip empty lines
      if (!line) {
        continue;
      }
      
      // If it's already an HTML tag, keep it as is
      if (line.match(/^<(h[1-6]|ul|ol|li|pre|hr|blockquote|code)/)) {
        paragraphed.push(line);
      } 
      // If it ends an HTML tag, keep it as is
      else if (line.match(/^<\/(ul|ol|pre|blockquote|code)/)) {
        paragraphed.push(line);
      }
      // Otherwise wrap in paragraph tags
      else if (line) {
        paragraphed.push('<p>' + line + '</p>');
      }
    }
    
    return paragraphed.join('\n');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'advanced':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'expert':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading lesson...</p>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    return (
      <div className="max-w-7xl mx-auto px-4">
        <div className="card text-center py-12">
          <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Lesson not found'}</p>
          <button onClick={() => navigate('/lessons')} className="btn btn-primary">
            Back to Lessons
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Back Button */}
      <button
        onClick={() => navigate('/lessons')}
        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Lessons
      </button>

      {/* Lesson Header */}
      <div className="card mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold text-lg">
            {lesson.orderIndex}
          </div>
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
        </div>

        <div className="mb-3">
          <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            {lesson.topic}
          </span>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-gray-900 dark:text-white">
          {lesson.title}
        </h1>

        <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
          {lesson.description}
        </p>

        <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{lesson.estimatedTime} minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>Lesson #{lesson.orderIndex}</span>
          </div>
        </div>
      </div>

      {/* Two Column Layout: Content + Console */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Lesson Content */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Lesson Content</h2>
          
          {(() => {
            const sections = parseSections(lesson.content);
            const currentSectionData = sections[currentSection];
            
            return (
              <>
                {/* Section Navigation */}
                {sections.length > 1 && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        Section {currentSection + 1} of {sections.length}
                      </span>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                          disabled={currentSection === 0}
                          className="px-3 py-1 text-sm rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 dark:hover:bg-gray-600"
                        >
                          ← Previous
                        </button>
                        <button
                          onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                          disabled={currentSection === sections.length - 1}
                          className="px-3 py-1 text-sm rounded-lg bg-primary-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-700"
                        >
                          Next →
                        </button>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
                      />
                    </div>
                    
                    {/* Section Selector */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {sections.map((section: { title: string; content: string }, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSection(index)}
                          className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                            currentSection === index
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                          title={section.title}
                        >
                          {index + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Current Section Content */}
                <div className="max-h-[60vh] overflow-y-auto pr-2">
                  <div 
                    className="prose prose-lg dark:prose-invert max-w-none
                      prose-headings:font-bold prose-headings:tracking-tight
                      prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0 prose-h1:leading-tight
                      prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:pb-4 prose-h2:border-b-2 prose-h2:border-primary-200 dark:prose-h2:border-primary-800 prose-h2:first:mt-0
                      prose-h3:text-xl prose-h3:mb-5 prose-h3:mt-8 prose-h3:text-primary-700 dark:prose-h3:text-primary-300 prose-h3:font-semibold
                      prose-h4:text-lg prose-h4:mb-4 prose-h4:mt-6
                      prose-p:text-base prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-loose prose-p:my-5
                      prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold prose-strong:bg-yellow-100 dark:prose-strong:bg-yellow-900/20 prose-strong:px-1
                      prose-code:text-primary-700 dark:prose-code:text-primary-300
                      prose-code:bg-primary-100 dark:prose-code:bg-primary-900/30
                      prose-code:px-2 prose-code:py-1 prose-code:rounded-md prose-code:font-mono prose-code:text-sm
                      prose-code:before:content-none prose-code:after:content-none
                      prose-pre:bg-slate-800 dark:prose-pre:bg-slate-800 prose-pre:text-slate-100
                      prose-pre:overflow-x-auto prose-pre:p-6 prose-pre:rounded-xl prose-pre:my-8
                      prose-pre:shadow-xl prose-pre:border-2 prose-pre:border-slate-700
                      prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                      prose-ul:my-6 prose-ul:space-y-3 prose-ul:list-none prose-ul:pl-0
                      prose-ol:my-6 prose-ol:space-y-3 prose-ol:list-decimal prose-ol:pl-6
                      prose-li:text-gray-700 dark:prose-li:text-gray-300 prose-li:leading-loose prose-li:pl-7 prose-li:relative
                      prose-li:before:content-['•'] prose-li:before:absolute prose-li:before:left-0 prose-li:before:text-primary-600 dark:prose-li:before:text-primary-400 prose-li:before:font-bold prose-li:before:text-xl
                      prose-blockquote:border-l-4 prose-blockquote:border-primary-500 prose-blockquote:bg-primary-50 dark:prose-blockquote:bg-primary-900/10
                      prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:italic
                      prose-hr:my-10 prose-hr:border-2 prose-hr:border-gray-300 dark:prose-hr:border-gray-600
                      [&>*:first-child]:mt-0 [&>*:last-child]:mb-0
                      [&_ul_li]:mb-3 [&_ol_li]:mb-3"
                    dangerouslySetInnerHTML={{ __html: formatContent(currentSectionData?.content || lesson.content) }}
                  />
                </div>
              </>
            );
          })()}
        </div>

        {/* Interactive Console */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 sticky top-4 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Practice Console</h2>
          
          {/* Code Editor */}
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 p-5 font-mono text-sm bg-gray-950 dark:bg-gray-950 text-gray-100 rounded-xl border-2 border-gray-700 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500 shadow-inner"
            placeholder="Write your Python code here..."
            spellCheck={false}
          />

          {/* Console Controls */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleRunCode}
              disabled={isRunning}
              className="btn btn-primary flex items-center gap-2 disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Run Code'}
            </button>
            <button
              onClick={handleReset}
              className="btn btn-secondary flex items-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Output */}
          {(output || consoleError) && (
            <div className="mt-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Output:</span>
              </div>
              <div className="bg-gray-950 dark:bg-gray-950 text-gray-100 p-5 rounded-xl font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto border-2 border-gray-700 shadow-inner">
                {consoleError && (
                  <div className="text-red-400 mb-2 flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{consoleError}</span>
                  </div>
                )}
                {output}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Exercises Section */}
      {lesson.exercises && lesson.exercises.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Practice Exercises</h2>
          
          {/* Exercise Tabs */}
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {lesson.exercises.map((exercise, index) => (
              <button
                key={exercise.id}
                onClick={() => setCurrentExerciseIndex(index)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors flex items-center gap-2 ${
                  currentExerciseIndex === index
                    ? 'bg-primary-600 text-white'
                    : completedExercises.has(index)
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {completedExercises.has(index) && <CheckCircle className="w-4 h-4" />}
                Exercise {index + 1}
              </button>
            ))}
          </div>

          {/* Current Exercise */}
          {lesson.exercises[currentExerciseIndex] && (
            <div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                {lesson.exercises[currentExerciseIndex].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed mb-6">
                {lesson.exercises[currentExerciseIndex].description}
              </p>

              {/* Hints */}
              {lesson.exercises[currentExerciseIndex].hints && lesson.exercises[currentExerciseIndex].hints.length > 0 && (
                <div className="mb-5">
                  <button
                    onClick={() => setShowHint(!showHint)}
                    className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors flex items-center gap-2"
                  >
                    <span className="text-base">{showHint ? '🙈' : '💡'}</span>
                    {showHint ? 'Hide Hint' : 'Show Hint'}
                  </button>
                  {showHint && (
                    <div className="mt-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 rounded-r-lg">
                      <p className="text-sm leading-relaxed text-yellow-900 dark:text-yellow-200">
                        {lesson.exercises[currentExerciseIndex].hints[0]}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Solution */}
              <div>
                <button
                  onClick={() => setShowSolution(!showSolution)}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors flex items-center gap-2"
                >
                  <span className="text-base">{showSolution ? '🚫' : '👀'}</span>
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
                {showSolution && (
                  <div className="mt-3 p-5 bg-gray-950 dark:bg-gray-950 border-2 border-gray-700 rounded-xl">
                    <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap overflow-x-auto">
                      {lesson.exercises[currentExerciseIndex].solution}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => {
            if (lesson.orderIndex > 1) {
              // Navigate to previous lesson - we'd need to fetch it or pass it
              navigate('/lessons');
            }
          }}
          disabled={lesson.orderIndex === 1}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous Lesson
        </button>
        <button
          onClick={() => {
            // Navigate to next lesson
            navigate('/lessons');
          }}
          className="btn btn-secondary"
        >
          Next Lesson →
        </button>
      </div>
    </div>
  );
};

// Helper function to format markdown-like content to HTML
function formatContent(content: string): string {
  let html = content;

  // Convert headers
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Convert code blocks
  html = html.replace(/```python\n([\s\S]*?)```/g, '<pre><code class="language-python">$1</code></pre>');
  html = html.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

  // Convert inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Convert bold
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

  // Convert lists
  html = html.replace(/^- (.*$)/gim, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');

  // Convert line breaks
  html = html.replace(/\n\n/g, '</p><p>');
  html = '<p>' + html + '</p>';

  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<h/g, '<h');
  html = html.replace(/<\/h([1-6])>\s*<\/p>/g, '</h$1>');
  html = html.replace(/<p>\s*<pre>/g, '<pre>');
  html = html.replace(/<\/pre>\s*<\/p>/g, '</pre>');
  html = html.replace(/<p>\s*<ul>/g, '<ul>');
  html = html.replace(/<\/ul>\s*<\/p>/g, '</ul>');

  return html;
}
