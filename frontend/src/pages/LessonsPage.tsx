import React, { useEffect, useState } from 'react';
import { BookOpen, Clock } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  difficulty: string;
  estimatedTime: number;
  topic: string;
  orderIndex: number;
}

export const LessonsPage: React.FC = () => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetchLessons();
  }, []);

  const fetchLessons = async () => {
    try {
      setLoading(true);
      console.log('Fetching from: http://localhost:3001/api/v1/lessons');
      
      const response = await fetch('http://localhost:3001/api/v1/lessons', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const text = await response.text();
      console.log('Response text:', text.substring(0, 200));
      
      const data = JSON.parse(text);
      console.log('Parsed data:', data);
      console.log('Is array?', Array.isArray(data));
      
      if (!data) {
        throw new Error('No data received from server');
      }
      
      if (!Array.isArray(data)) {
        console.error('Data is not an array:', typeof data, data);
        throw new Error('Invalid data format received from server');
      }
      
      const sorted = [...data].sort((a: Lesson, b: Lesson) => a.orderIndex - b.orderIndex);
      console.log('Sorted lessons:', sorted.length, 'items');
      setLessons(sorted);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching lessons:', err);
      setError(err.message || 'Failed to load lessons');
    } finally {
      setLoading(false);
    }
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

  const filteredLessons = filter === 'all' 
    ? lessons 
    : lessons.filter(lesson => lesson.difficulty.toLowerCase() === filter);

  const topics = [...new Set(lessons.map(l => l.topic))];

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300">Loading lessons...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="card text-center py-12">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button onClick={fetchLessons} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Python Lessons</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Learn Python step by step with our structured curriculum. {lessons.length} lessons available.
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'all'
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          All ({lessons.length})
        </button>
        <button
          onClick={() => setFilter('beginner')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'beginner'
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Beginner ({lessons.filter(l => l.difficulty.toLowerCase() === 'beginner').length})
        </button>
        <button
          onClick={() => setFilter('intermediate')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            filter === 'intermediate'
              ? 'bg-yellow-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          Intermediate ({lessons.filter(l => l.difficulty.toLowerCase() === 'intermediate').length})
        </button>
      </div>

      {/* Lessons Grid */}
      {filteredLessons.length === 0 ? (
        <div className="card text-center py-12">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-2xl font-semibold mb-2">No lessons found</h2>
          <p className="text-gray-600 dark:text-gray-300">
            Try selecting a different difficulty level.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredLessons.map((lesson) => (
            <div
              key={lesson.id}
              className="card hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => window.location.href = `/lessons/${lesson.slug}`}
            >
              {/* Lesson Number Badge */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-300 font-bold">
                  {lesson.orderIndex}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
                  {lesson.difficulty}
                </span>
              </div>

              {/* Topic Badge */}
              <div className="mb-2">
                <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  {lesson.topic}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {lesson.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                {lesson.description}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{lesson.estimatedTime} min</span>
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4" />
                  <span>Lesson</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Topics Overview */}
      {topics.length > 0 && (
        <div className="mt-12 card">
          <h2 className="text-2xl font-bold mb-4">Topics Covered</h2>
          <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
              <span
                key={topic}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-full text-sm font-medium"
              >
                {topic} ({lessons.filter(l => l.topic === topic).length})
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
