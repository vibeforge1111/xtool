import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { Sparkles, ArrowRight, Star, Zap, Eye } from 'lucide-react';
import { authService } from '../services/auth';
import FloatingOrbs from './FloatingOrbs';
import PersonalityPreview from './PersonalityPreview';
import EmojiExplosion from './EmojiExplosion';

const Landing: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [typewriterText, setTypewriterText] = useState('');
  const [clickCount, setClickCount] = useState(0);
  const [showSecret, setShowSecret] = useState(false);
  const [chaos, setChaos] = useState(false);
  const [emojiTrigger, setEmojiTrigger] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controls = useAnimationControls();
  
  const fullTexts = [
    "Discover Your Digital Soul",
    "Touch Some Grass Maybe?",
    "ur tweets are mid fr",
    "Main Character Energy Loading...",
    "bestie are u ok??",
    "Delulu Era Activated",
    "No Thoughts, Just Vibes"
  ];
  const fullText = fullTexts[Math.floor(clickCount / 3) % fullTexts.length];
  
  useEffect(() => {
    setTypewriterText('');
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullText.length) {
        setTypewriterText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);
    
    return () => clearInterval(timer);
  }, [fullText]);

  // Track mouse for emoji explosions
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Easter egg: Konami code
  useEffect(() => {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          setChaos(true);
          document.body.classList.add('rainbow-text');
          setTimeout(() => {
            setChaos(false);
            document.body.classList.remove('rainbow-text');
          }, 10000);
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleConnectTwitter = async () => {
    try {
      setIsLoading(true);
      setError(null);
      setClickCount(prev => prev + 1);
      
      // Random chaos triggers
      if (Math.random() > 0.7) {
        setEmojiTrigger(prev => prev + 1);
      }
      
      if (clickCount > 5) {
        setShowSecret(true);
      }
      
      // Trigger button animation
      await controls.start({
        scale: [1, 0.95, 1.1, 1],
        rotate: clickCount > 10 ? [0, -5, 5, -5, 0] : 0,
        transition: { duration: 0.3 }
      });
      
      const authData = await authService.initiateTwitterAuth();
      window.location.href = authData.authUrl;
    } catch (err) {
      const errorMessages = [
        'bestie the server said no 💀',
        'it\'s giving technical difficulties',
        'sir this is a wendy\'s',
        'error 404: vibes not found',
        'the app is having its villain arc rn',
        'not the server being quirky 🤪'
      ];
      setError(errorMessages[Math.floor(Math.random() * errorMessages.length)]);
      setIsLoading(false);
      
      // Shake on error
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 500);
    }
  };

  return (
    <div className={`min-h-screen relative overflow-hidden ${chaos ? 'glitch' : ''}`}>
      {/* Emoji Explosion Layer */}
      <EmojiExplosion trigger={emojiTrigger > 0} x={mousePosition.x} y={mousePosition.y} />
      
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20">
        <FloatingOrbs />
        {chaos && (
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-red-500/20 via-yellow-500/20 to-green-500/20"
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
        )}
      </div>

      {/* Secret Message */}
      {showSecret && (
        <motion.div
          className="fixed top-10 right-10 bg-black/80 text-white p-4 rounded-lg z-50"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <p className="text-sm">psst... you're clicking too much bestie 👀</p>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="px-6 py-4">
          <motion.div 
            className="flex items-center space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ x: Math.random() > 0.5 ? 5 : -5 }}
            onClick={() => {
              if (Math.random() > 0.8) {
                document.body.classList.add('glitch');
                setTimeout(() => document.body.classList.remove('glitch'), 200);
              }
            }}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center"
              whileHover={{ rotate: 360, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles size={16} className="text-white" />
            </motion.div>
            <span className={`text-xl font-bold gradient-text ${chaos ? 'glitch-text' : ''}`} data-text="X Insights">
              X Insights
            </span>
          </motion.div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className={`gradient-text typewriter ${clickCount > 15 ? 'glitch-text' : ''}`} data-text={typewriterText}>
                  {typewriterText}
                </span>
                <motion.span
                  className="inline-block ml-2"
                  animate={{ 
                    opacity: [1, 0, 1],
                    rotate: clickCount > 20 ? [0, 180, 360] : 0 
                  }}
                  transition={{ duration: 1, repeat: Infinity }}
                  onClick={() => setEmojiTrigger(prev => prev + 1)}
                  style={{ cursor: 'pointer' }}
                >
                  {clickCount < 5 ? '✨' : clickCount < 10 ? '💀' : clickCount < 15 ? '🤡' : '👹'}
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                AI-powered analysis that reveals your Twitter personality with{' '}
                <span className={`gradient-text-accent font-semibold ${chaos ? 'rainbow-text' : ''}`}>
                  {clickCount < 10 ? 'scary accuracy' : 'unhinged chaos'}
                </span>
              </motion.p>
              
              <motion.p 
                className="text-lg text-gray-400 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                {clickCount < 5 ? 'Join thousands discovering their digital archetypes. What will yours reveal?' : 
                 clickCount < 10 ? 'bestie this app knows too much fr fr' :
                 clickCount < 15 ? 'why are you still clicking? touch grass' :
                 'ok you broke it. happy now? 🤨'}
              </motion.p>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-12"
            >
              <motion.div 
                className="glass-dark rounded-3xl p-8 max-w-md mx-auto backdrop-blur-xl border border-white/10"
                animate={clickCount > 25 ? {
                  rotate: [0, 1, -1, 0],
                  transition: { duration: 0.1, repeat: Infinity }
                } : {}}
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  {clickCount < 10 ? 'Ready for the truth?' : 
                   clickCount < 20 ? 'bestie are u sure?' :
                   'this is your last warning'}
                </h2>
                
                {error && (
                  <motion.div 
                    className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg backdrop-blur"
                    initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    whileHover={{ rotate: [0, -2, 2, 0] }}
                  >
                    <p className="text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}

                <motion.button
                  onClick={handleConnectTwitter}
                  disabled={isLoading}
                  className="w-full relative group"
                  animate={controls}
                  whileHover={{ 
                    scale: chaos ? [1.02, 0.98, 1.02] : 1.02,
                    boxShadow: "0 20px 40px rgba(124, 58, 237, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  onHoverStart={() => {
                    if (clickCount > 30) {
                      setEmojiTrigger(prev => prev + 1);
                    }
                  }}
                >
                  {/* Button Glow */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"
                    animate={chaos ? {
                      rotate: [0, 360],
                      transition: { duration: 2, repeat: Infinity, ease: "linear" }
                    } : {}}
                  />
                  
                  {/* Button Content */}
                  <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold py-4 px-8 rounded-xl flex items-center justify-center space-x-3 transition-all duration-200">
                    {isLoading ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span>{clickCount > 20 ? 'bestie wait-' : 'Connecting...'}</span>
                      </>
                    ) : (
                      <>
                        <Zap size={20} className="group-hover:text-yellow-300 transition-colors" />
                        <span>
                          {clickCount < 5 ? 'Analyze My Personality' :
                           clickCount < 10 ? 'Expose My Cringe' :
                           clickCount < 15 ? 'Destroy My Ego' :
                           clickCount < 20 ? 'End My Whole Career' :
                           clickCount < 25 ? 'Delete My Existence' :
                           'AAAAAAAAAAAAA'}
                        </span>
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </motion.button>

                <p className="text-xs text-gray-400 mt-4 flex items-center justify-center space-x-2">
                  <Eye size={14} />
                  <span>
                    {clickCount < 15 ? 'Only reads public tweets • 100% secure' : 
                     'we know what you did last summer'}
                  </span>
                </p>
              </motion.div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto mb-16"
            >
              {[
                { number: chaos ? '69K+' : '47K+', label: chaos ? 'Traumatized' : 'Analyzed' },
                { number: chaos ? '420' : '12', label: chaos ? 'Brain Cells' : 'Archetypes' },
                { number: chaos ? '0%' : '99%', label: chaos ? 'Chill' : 'Accuracy' }
              ].map((stat) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  whileHover={{ scale: 1.05, rotate: chaos ? [0, -5, 5, 0] : 0 }}
                >
                  <div className={`text-2xl font-bold gradient-text-accent ${chaos ? 'glitch-text' : ''}`} data-text={stat.number}>
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </main>

        {/* Preview Section */}
        <section className="px-6 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="max-w-7xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold text-white mb-4 ${chaos ? 'glitch-text' : ''}`} data-text="Which archetype are you?">
                Which archetype are <span className="gradient-text-accent">you?</span>
              </h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                {chaos ? 'Each personality type was crafted while having a mental breakdown at 3am' :
                 'Each personality type is carefully crafted from analyzing millions of tweets. Discover your digital DNA.'}
              </p>
            </div>
            
            <PersonalityPreview />
          </motion.div>
        </section>

        {/* Trust Indicators */}
        <footer className="px-6 pb-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-wrap justify-center items-center space-x-8 text-gray-500"
          >
            {[
              { icon: Star, text: chaos ? 'Privacy Last' : 'Privacy First' },
              { icon: Zap, text: chaos ? 'Instant Regret' : 'Instant Results' },
              { icon: Sparkles, text: chaos ? 'AI Unhinged' : 'AI Powered' }
            ].map(({ icon: Icon, text }) => (
              <motion.div 
                key={text} 
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.1, rotate: chaos ? 180 : 0 }}
              >
                <Icon size={16} />
                <span className="text-sm">{text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Hidden message */}
          <motion.div
            className="text-center mt-8 text-xs text-gray-700"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
          >
            {clickCount > 50 && "you really have nothing better to do huh"}
          </motion.div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;