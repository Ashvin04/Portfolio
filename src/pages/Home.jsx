import React from 'react';
import { motion } from 'framer-motion';
import AJStar from '../components/AJStar';
import P5RansomText from '../components/P5RansomText';
import './Home.css';

const Home = ({ activeView, onNavClick }) => {
  const menuOptions = [
    { id: 'programmer', num: '01', label: 'ABOUT ME' },
    { id: 'works', num: '02', label: 'PROJECTS' },
    { id: 'card', num: '03', label: 'CONTACT' }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      x: -100, 
      skewX: -30, 
      scale: 0.85 
    },
    visible: { 
      opacity: 1, 
      x: 0, 
      skewX: -15, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 450, 
        damping: 18 
      }
    }
  };

  return (
    <div className="page-container" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
      <div className="p5-home-container" style={{ width: '100%' }}>
        <div className="p5-home-layout">
          
          {/* Left Column: Star & Title */}
          <div className="p5-hero-left">
            <div style={{ minHeight: 180, display: 'flex', alignItems: 'center' }}>
              {activeView === 'home' && (
                <motion.div 
                  layoutId="shared-star"
                  transition={{ type: 'spring', stiffness: 380, damping: 22 }}
                >
                  <AJStar size={180} animate={true} />
                </motion.div>
              )}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 30, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -3 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.2 }}
              className="p5-hero-title-plate"
            >
              <h1>ASHVIN JEEVARASA</h1>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="p5-hero-subtitle"
            >
              GAMEPLAY & SYSTEMS DEVELOPER
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.3 }}
              className="p5-hero-desc"
            >
              Specializing in gameplay scripting, robust multiplayer netcode, dynamic camera algorithms, and responsive game UI structures. 
              <br />
              <span style={{ color: 'var(--p5-yellow)', fontFamily: 'var(--font-p5-hand)', fontSize: '1.4rem' }}>
                "We will steal your bugs and deliver smooth systems."
              </span>
            </motion.div>

          </div>

          {/* Right Column: Menu Options */}
          <motion.div 
            className="p5-home-menu"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {menuOptions.map((opt) => (
              <motion.button
                key={opt.id}
                variants={itemVariants}
                onClick={() => onNavClick(opt.id)}
                className="p5-main-menu-item"
                whileTap={{ scale: 0.95 }}
              >
                <div>
                  <span className="menu-num">{opt.num}</span>
                  <span>{opt.label}</span>
                </div>
                <span className="menu-arrow">▼</span>
              </motion.button>
            ))}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Home;
