import { motion } from 'framer-motion';

const FloatingOrbs = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large purple orb */}
      <motion.div
        className="floating-orb w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 absolute -top-48 -left-48"
        animate={{
          x: [0, 100, 0],
          y: [0, -50, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      {/* Medium blue orb */}
      <motion.div
        className="floating-orb w-64 h-64 bg-gradient-to-br from-blue-400 to-cyan-400 absolute top-1/4 -right-32"
        animate={{
          x: [0, -80, 0],
          y: [0, 80, 0],
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
          delay: 2
        }}
      />
      
      {/* Small pink orb */}
      <motion.div
        className="floating-orb w-48 h-48 bg-gradient-to-br from-pink-400 to-red-400 absolute bottom-1/4 -left-24"
        animate={{
          x: [0, 60, 0],
          y: [0, -60, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
          delay: 4
        }}
      />
      
      {/* Tiny green orb */}
      <motion.div
        className="floating-orb w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-400 absolute top-3/4 right-1/4"
        animate={{
          x: [0, -40, 0],
          y: [0, -40, 0],
          scale: [1, 0.6, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
          delay: 1
        }}
      />
      
      {/* Mini yellow orb */}
      <motion.div
        className="floating-orb w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-400 absolute top-1/3 left-1/4"
        animate={{
          x: [0, 30, 0],
          y: [0, 30, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
          delay: 3
        }}
      />
    </div>
  );
};

export default FloatingOrbs;