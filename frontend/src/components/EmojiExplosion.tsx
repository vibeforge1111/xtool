import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Emoji {
  id: number;
  emoji: string;
  x: number;
  y: number;
}

const emojiList = ['💀', '✨', '🔥', '😭', '💅', '🤡', '👁️', '🗿', '💯', '🧠', '🦝', '🌱', '😈', '🎲', '🦋', '🐸', '👽', '🍃'];

const EmojiExplosion = ({ trigger, x = 50, y = 50 }: { trigger: boolean; x?: number; y?: number }) => {
  const [emojis, setEmojis] = useState<Emoji[]>([]);

  useEffect(() => {
    if (trigger) {
      const newEmojis = Array.from({ length: 15 }, (_, i) => ({
        id: Date.now() + i,
        emoji: emojiList[Math.floor(Math.random() * emojiList.length)],
        x: x + (Math.random() - 0.5) * 200,
        y: y + (Math.random() - 0.5) * 200,
      }));
      setEmojis(prev => [...prev, ...newEmojis]);
      
      // Clean up after animation
      setTimeout(() => {
        setEmojis(prev => prev.filter(e => !newEmojis.includes(e)));
      }, 3000);
    }
  }, [trigger, x, y]);

  return (
    <AnimatePresence>
      {emojis.map((emoji) => (
        <motion.div
          key={emoji.id}
          className="fixed pointer-events-none text-4xl z-50"
          initial={{ 
            x: x, 
            y: y, 
            scale: 0,
            rotate: 0
          }}
          animate={{ 
            x: emoji.x,
            y: emoji.y,
            scale: [0, 1.5, 0],
            rotate: Math.random() * 720 - 360,
          }}
          exit={{ 
            scale: 0,
            opacity: 0
          }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          {emoji.emoji}
        </motion.div>
      ))}
    </AnimatePresence>
  );
};

export default EmojiExplosion;