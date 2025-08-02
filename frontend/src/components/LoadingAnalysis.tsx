import React, { useState, useEffect } from 'react';

const loadingMessages = [
  "Analyzing your digital personality...",
  "Reading between the tweets...", 
  "Decoding your social patterns...",
  "Discovering your Twitter archetype...",
  "Measuring your meme potential...",
  "Calculating your viral coefficient...",
  "Mapping your engagement style...",
  "Processing your digital DNA...",
  "Unveiling your online persona...",
  "Almost done with the magic...",
];

const LoadingAnalysis: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Update message every 2.5 seconds
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % loadingMessages.length);
    }, 2500);

    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev; // Stop at 95% to keep some suspense
        return prev + Math.random() * 3 + 1; // Random increment between 1-4
      });
    }, 200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            X Insights
          </h1>
          <p className="text-gray-600">AI-Powered Personality Analysis</p>
        </div>

        {/* Animated Brain/Analysis Icon */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-spin"></div>
            
            {/* Inner pulsing circle */}
            <div className="absolute inset-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>

            {/* Floating particles */}
            <div className="absolute -top-2 -left-2 w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
            <div className="absolute -top-2 -right-2 w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
            <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '1.5s' }}></div>
          </div>
        </div>

        {/* Loading Message */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <p className="text-lg font-medium text-gray-700 transition-all duration-500 ease-in-out">
            {loadingMessages[currentMessage]}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Fun Statistics */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-bold text-blue-600">
              <span className="tabular-nums">200</span>
            </div>
            <div className="text-xs text-gray-500">Tweets Analyzed</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-bold text-purple-600">
              <span className="tabular-nums">{Math.round(progress * 0.42)}k</span>
            </div>
            <div className="text-xs text-gray-500">Words Processed</div>
          </div>
          <div className="bg-white rounded-lg p-3 shadow-sm">
            <div className="text-lg font-bold text-green-600">
              <span className="tabular-nums">{Math.round(progress * 0.12)}</span>
            </div>
            <div className="text-xs text-gray-500">Patterns Found</div>
          </div>
        </div>

        {/* Trust Indicator */}
        <div className="mt-8 flex items-center justify-center space-x-2 text-gray-500">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Your data is secure and private</span>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnalysis;