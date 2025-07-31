import React from 'react';

export const TestStyles: React.FC = () => {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-blue-500 text-white rounded-lg shadow-lg z-50">
      <h3 className="font-bold">Tailwind Test</h3>
      <p className="text-sm">If you see blue background and white text, Tailwind is working!</p>
      <div className="mt-2 space-x-2">
        <span className="inline-block w-4 h-4 bg-red-500"></span>
        <span className="inline-block w-4 h-4 bg-green-500"></span>
        <span className="inline-block w-4 h-4 bg-yellow-500"></span>
      </div>
    </div>
  );
};