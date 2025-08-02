import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Zap, MessageCircle, TrendingUp, Eye, Lightbulb } from 'lucide-react';

const viralMessages = [
  { text: "Judging your ratio'd tweets...", icon: Eye },
  { text: "Calculating how chronically online you are...", icon: Lightbulb },
  { text: "Found 47 unhinged takes at 3am...", icon: Brain },
  { text: "Your Twitter is giving ✨trauma✨", icon: TrendingUp },
  { text: "bestie your tweets are... concerning", icon: MessageCircle },
  { text: "Determining if you need to touch grass...", icon: Zap },
  { text: "not the keyboard smashing era 💀", icon: Brain },
  { text: "Your villain arc started in 2020 fr", icon: Eye },
  { text: "why are you tweeting at 4:17 AM??", icon: Lightbulb },
  { text: "no but like... who hurt you?", icon: Zap },
  { text: "the delulu is strong with this one", icon: Brain },
  { text: "you're either 14 or 41, no in between", icon: Eye },
  { text: "your tweets failed the vibe check", icon: MessageCircle },
  { text: "girlie this is NOT the serve you think it is", icon: TrendingUp },
  { text: "caught in 4K being cringe", icon: Lightbulb },
  { text: "main character syndrome detected", icon: Zap },
  { text: "respectfully... seek help", icon: Brain },
  { text: "your twitter is a cry for help and we hear you", icon: Eye },
  { text: "no thoughts, just vibes (derogatory)", icon: MessageCircle },
  { text: "it's giving unemployed", icon: TrendingUp },
];

const LoadingAnalysis: React.FC = () => {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tweetsAnalyzed, setTweetsAnalyzed] = useState(0);
  const [wordsProcessed, setWordsProcessed] = useState(0);
  const [patternsFound, setPatternsFound] = useState(0);

  useEffect(() => {
    // Update message every 2.5 seconds with smooth transitions
    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % viralMessages.length);
    }, 2500);

    // Smooth progress increment
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev; // Stop at 95% for suspense
        return prev + Math.random() * 2 + 0.5; // Random increment
      });
    }, 150);

    // Counter animations
    const statsInterval = setInterval(() => {
      setTweetsAnalyzed(prev => Math.min(prev + Math.floor(Math.random() * 15) + 5, 200));
      setWordsProcessed(prev => Math.min(prev + Math.floor(Math.random() * 500) + 200, 42000));
      setPatternsFound(prev => Math.min(prev + Math.floor(Math.random() * 3) + 1, 87));
    }, 300);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearInterval(statsInterval);
    };
  }, []);

  const CurrentIcon = viralMessages[currentMessage].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-blue-900/30 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Brand Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Zap size={16} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              X Insights
            </h1>
          </div>
          <p className="text-gray-400 text-sm">AI-Powered Personality Analysis</p>
        </motion.div>

        {/* Main Analysis Animation */}
        <div className="relative mb-12">
          {/* Outer Rotating Ring */}
          <motion.div
            className="w-32 h-32 mx-auto relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 border-4 border-transparent bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" 
                 style={{ padding: '4px' }}>
              <div className="w-full h-full bg-gray-900 rounded-full"></div>
            </div>
          </motion.div>
          
          {/* Inner Pulsing Core */}
          <motion.div
            className="absolute inset-0 w-32 h-32 mx-auto"
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(147, 51, 234, 0.5)",
                "0 0 40px rgba(236, 72, 153, 0.8)",
                "0 0 20px rgba(147, 51, 234, 0.5)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <motion.div
                key={currentMessage}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.5, type: "spring", bounce: 0.5 }}
              >
                <CurrentIcon size={32} className="text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Orbiting Particles */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
              style={{
                top: '50%',
                left: '50%',
                marginTop: '-6px',
                marginLeft: '-6px',
              }}
              animate={{
                x: [0, 60 * Math.cos((i * Math.PI) / 2), 0],
                y: [0, 60 * Math.sin((i * Math.PI) / 2), 0],
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>

        {/* Status Message */}
        <div className="mb-8 h-16 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentMessage}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 1.1 }}
              transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
              className="text-lg font-medium text-white text-center max-w-sm mx-auto"
            >
              {viralMessages[currentMessage].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Analysis Progress</span>
            <motion.span
              key={Math.floor(progress)}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="font-medium"
            >
              {Math.round(progress)}%
            </motion.span>
          </div>
          <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full relative"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Shimmer effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Live Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="grid grid-cols-3 gap-4"
        >
          {[
            { value: tweetsAnalyzed, label: "Tweets", max: 200, color: "from-blue-500 to-cyan-500" },
            { value: wordsProcessed, label: "Words", max: 42000, color: "from-purple-500 to-pink-500" },
            { value: patternsFound, label: "Patterns", max: 87, color: "from-green-500 to-emerald-500" }
          ].map((stat) => (
            <motion.div
              key={stat.label}
              className="glass-dark rounded-xl p-4 backdrop-blur-lg border border-white/10"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <motion.div
                className={`text-xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}
                key={stat.value}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {stat.value.toLocaleString()}
                {stat.label === "Words" && "k"}
              </motion.div>
              <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 flex items-center justify-center space-x-2 text-gray-500"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <Zap size={16} />
          </motion.div>
          <span className="text-sm">Your data is secure and private</span>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingAnalysis;