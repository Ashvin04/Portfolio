import React from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero-background"></div>
      <div className="hero-content">
        <motion.div 
          className="title-wrapper jagged-border"
          initial={{ x: -300, skewX: 30, opacity: 0 }}
          animate={{ x: 0, skewX: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
        >
          <h1 className="hero-title text-stroke">GAME</h1>
        </motion.div>
        
        <motion.div 
          className="title-wrapper-alt jagged-border-alt"
          initial={{ x: 300, skewX: -30, opacity: 0 }}
          animate={{ x: 0, skewX: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100, delay: 0.1 }}
        >
          <h1 className="hero-title-alt">DEVELOPER</h1>
        </motion.div>
        
        <motion.div 
          className="mini-brief jagged-border"
          initial={{ y: 100, scale: 0.8, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          transition={{ type: 'spring', delay: 0.3, bounce: 0.6 }}
        >
          <p>
            Welcome to my portfolio! I build immersive, fast-paced, and stylized game experiences. 
            Scroll down to dive into my recent projects.
          </p>
        </motion.div>
      </div>
      
      {/* Decorative stars/shapes common in P5 */}
      <motion.div 
        className="p5-star star-1"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', delay: 0.5 }}
      ></motion.div>
      
      <motion.div 
        className="p5-star star-2"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', delay: 0.7 }}
      ></motion.div>
    </section>
  );
};

export default Hero;
