import React from 'react';
import { Loader2, Brain } from 'lucide-react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <Brain className="w-8 h-8 text-green-600 mr-3" />
        <Loader2 className="w-8 h-8 text-green-600 animate-spin" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Analyzing Your Food</h3>
      <p className="text-gray-600 mb-4">
        Our AI is identifying the food and calculating nutritional information...
      </p>
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center justify-center">
          <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse mr-2"></div>
          Processing image with computer vision
        </div>
        <div className="flex items-center justify-center">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse mr-2" style={{ animationDelay: '0.2s' }}></div>
          Identifying food items
        </div>
        <div className="flex items-center justify-center">
          <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse mr-2" style={{ animationDelay: '0.4s' }}></div>
          Calculating nutrition facts
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;