import { motion } from 'framer-motion';
import { Coffee, Ghost, Sparkles, Skull, Heart, FlameKindling } from 'lucide-react';

const personalities = [
  {
    id: 'delulu',
    name: 'Delulu Era Protagonist',
    emoji: '✨',
    icon: Sparkles,
    gradient: 'from-pink-500 via-purple-500 to-indigo-500',
    description: 'Lives in their own anime',
    rarity: '3.7%',
    vibes: 'unhinged optimism'
  },
  {
    id: 'npc',
    name: 'Background Character',
    emoji: '🗿',
    icon: Ghost,
    gradient: 'from-gray-600 via-gray-500 to-gray-400',
    description: 'No thoughts, just vibes',
    rarity: '23%',
    vibes: 'absolutely nothing'
  },
  {
    id: 'villain',
    name: 'Unhinged Villain Arc',
    emoji: '😈',
    icon: Skull,
    gradient: 'from-red-600 via-orange-500 to-yellow-500',
    description: 'Woke up and chose violence',
    rarity: '6.9%',
    vibes: 'chaotic evil energy'
  },
  {
    id: 'touch-grass',
    name: 'Chronically Online',
    emoji: '💀',
    icon: Coffee,
    gradient: 'from-green-400 via-blue-500 to-purple-600',
    description: 'Hasn\'t seen sunlight since 2020',
    rarity: '42.0%',
    vibes: 'terminal brain rot'
  },
  {
    id: 'golden-retriever',
    name: 'Golden Retriever Energy',
    emoji: '🌟',
    icon: Heart,
    gradient: 'from-yellow-400 via-orange-400 to-pink-400',
    description: 'Too pure for this app',
    rarity: '11%',
    vibes: 'head empty, heart full'
  },
  {
    id: 'feral',
    name: 'Absolutely Feral',
    emoji: '🦝',
    icon: FlameKindling,
    gradient: 'from-purple-600 via-pink-500 to-red-500',
    description: 'Tweets like keyboard smashing',
    rarity: '0.1%',
    vibes: 'goblin mode activated'
  }
];

const PersonalityPreview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {personalities.map((personality, index) => {
        const Icon = personality.icon;
        
        return (
          <motion.div
            key={personality.id}
            className="relative group cursor-pointer"
            initial={{ opacity: 0, y: 50, rotate: Math.random() * 10 - 5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              type: "spring",
              bounce: 0.5
            }}
            whileHover={{ 
              y: -15,
              rotate: Math.random() > 0.5 ? 3 : -3,
              scale: 1.05
            }}
            onHoverStart={() => {
              // Random chance to glitch
              if (Math.random() > 0.8) {
                document.body.classList.add('glitch');
                setTimeout(() => document.body.classList.remove('glitch'), 100);
              }
            }}
          >
            {/* Chaotic glow effect */}
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-r ${personality.gradient} rounded-2xl opacity-20 blur-xl group-hover:opacity-60 transition-opacity duration-300`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            
            {/* Card */}
            <div className="relative glass rounded-2xl p-6 border border-white/20 group-hover:border-white/40 transition-all duration-300 overflow-hidden">
              {/* Random glitch lines */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
              >
                <div className="absolute top-1/4 left-0 right-0 h-px bg-cyan-500/50" />
                <div className="absolute top-1/2 left-0 right-0 h-px bg-pink-500/50" />
                <div className="absolute top-3/4 left-0 right-0 h-px bg-yellow-500/50" />
              </motion.div>

              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <motion.div 
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${personality.gradient} flex items-center justify-center text-white shadow-lg relative`}
                  whileHover={{
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 }
                  }}
                >
                  <Icon size={24} />
                  {/* Random emoji pop */}
                  <motion.span
                    className="absolute -top-2 -right-2 text-2xl"
                    initial={{ scale: 0, rotate: -180 }}
                    whileHover={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", bounce: 0.7 }}
                  >
                    {personality.emoji}
                  </motion.span>
                </motion.div>
                <div className="text-right">
                  <motion.div 
                    className="text-2xl mb-1"
                    whileHover={{ 
                      scale: [1, 1.5, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                  >
                    {personality.emoji}
                  </motion.div>
                  <div className="text-xs text-gray-400">
                    {personality.id === 'villain' ? 'Nice' : 'Rarity'}: {personality.rarity}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 transition-all duration-300">
                {personality.name}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {personality.description}
              </p>
              <motion.p 
                className="text-xs text-gray-500 mt-2 italic"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                vibes: {personality.vibes}
              </motion.p>
              
              {/* Hover chaos */}
              <motion.div
                className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div 
                  className={`text-xs text-gray-400`}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {personality.id === 'npc' && 'literally you rn'}
                  {personality.id === 'delulu' && 'so real bestie'}
                  {personality.id === 'villain' && 'slay honestly'}
                  {personality.id === 'touch-grass' && 'go outside pls'}
                  {personality.id === 'golden-retriever' && 'protecc at all costs'}
                  {personality.id === 'feral' && 'seek help immediately'}
                </motion.div>
              </motion.div>

              {/* Random easter eggs */}
              {personality.id === 'touch-grass' && (
                <motion.div
                  className="absolute -bottom-10 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="text-4xl">🌱</span>
                </motion.div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default PersonalityPreview;