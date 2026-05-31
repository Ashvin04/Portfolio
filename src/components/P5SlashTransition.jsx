import React from 'react';
import { motion } from 'framer-motion';

const P5SlashTransition = ({ onComplete }) => {
  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Red Slash from Left to Right */}
      <motion.div
        variants={{
          initial: { x: '-120%', skewX: -20 },
          animate: { 
            x: ['-120%', '0%', '120%'],
            transition: { 
              duration: 0.5, 
              times: [0, 0.4, 1],
              ease: [0.19, 1, 0.22, 1] 
            }
          }
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: '-10%',
          width: '120%',
          height: '100%',
          backgroundColor: 'var(--p5-red)',
          transformOrigin: 'top left',
          boxShadow: '0 0 50px rgba(0,0,0,0.5)'
        }}
      />

      {/* Black Slash with White border from Right to Left */}
      <motion.div
        variants={{
          initial: { x: '120%', skewX: -20 },
          animate: { 
            x: ['120%', '0%', '-120%'],
            transition: { 
              duration: 0.5, 
              times: [0, 0.4, 1],
              ease: [0.19, 1, 0.22, 1],
              delay: 0.05
            }
          }
        }}
        onAnimationComplete={onComplete}
        style={{
          position: 'absolute',
          top: 0,
          left: '-10%',
          width: '120%',
          height: '100%',
          backgroundColor: 'var(--p5-black)',
          borderLeft: '8px solid var(--p5-white)',
          borderRight: '8px solid var(--p5-white)',
          transformOrigin: 'bottom right',
          boxShadow: '0 0 50px rgba(0,0,0,0.8)'
        }}
      />

      {/* Giant accent star flash in center */}
      <motion.div
        variants={{
          initial: { scale: 0, opacity: 0, rotate: -45 },
          animate: {
            scale: [0, 1.5, 0],
            opacity: [0, 0.9, 0],
            rotate: [0, 90, 180],
            transition: { 
              duration: 0.4, 
              times: [0.1, 0.45, 0.8],
              ease: 'easeInOut',
              delay: 0.08
            }
          }
        }}
        style={{
          position: 'absolute',
          top: '30%',
          left: '35%',
          width: '30%',
          height: '40%',
          background: 'var(--p5-yellow)',
          clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
};

export default P5SlashTransition;
