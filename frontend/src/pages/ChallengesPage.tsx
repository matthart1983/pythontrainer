import React from 'react';
import { Trophy } from 'lucide-react';

export const ChallengesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Coding Challenges</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Test your skills with hands-on coding challenges.
        </p>
      </div>

      <div className="card text-center py-12">
        <Trophy className="w-16 h-16 mx-auto mb-4 text-gray-400" />
        <h2 className="text-2xl font-semibold mb-2">Challenges Coming Soon</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          We're crafting exciting challenges to test your Python skills. Stay tuned!
        </p>
        <p className="text-sm text-gray-500">
          Practice your skills in the <a href="/console" className="text-primary-600 hover:underline">Python Console</a>
        </p>
      </div>
    </div>
  );
};
