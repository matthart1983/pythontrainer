import React from 'react';
import { InteractiveConsole } from '@/components/console/InteractiveConsole';

export const ConsolePage: React.FC = () => {
  return (
    <div className="h-[calc(100vh-12rem)]">
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Python Console</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Experiment with Python code in an interactive environment. Your code runs directly in the browser!
        </p>
      </div>
      
      <div className="h-[calc(100%-5rem)]">
        <InteractiveConsole />
      </div>
    </div>
  );
};
