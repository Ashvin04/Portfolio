import React from 'react';
import { motion } from 'framer-motion';
import P5RansomText from '../components/P5RansomText';
import AJStar from '../components/AJStar';
import './About.css';

const About = ({ onNavClick }) => {


  const equippedSkills = [
    'Netcode Synchronization',
    'Dynamic Camera Rigging',
    'Adaptive Audio Fades',
    'UI Toolkit Layouts',
    'State Machine AI',
    'Unity Systems Optimization'
  ];

  return (
    <div className="page-container" style={{ position: 'relative', minHeight: 'auto', padding: '20px 0' }}>
      
      {/* Title */}
      <div style={{ marginBottom: '30px', marginTop: '10px' }}>
        <P5RansomText text="ABOUT ME" sizeMultiplier={1.5} />
      </div>

      <div className="p5-about-layout">
        
        {/* Left Column: Character Card */}
        <motion.div 
          className="p5-profile-card"
          initial={{ opacity: 0, x: -80, rotate: -3 }}
          whileInView={{ opacity: 1, x: 0, rotate: -1.5 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        >
          {/* Subtle star pattern behind profile card */}
          <div className="p5-profile-star-decor">
            <AJStar size={200} animate={false} />
          </div>

          <div className="p5-profile-header">
            <h2 className="p5-profile-name">ASHVIN JEEVARASA</h2>
            <div className="p5-profile-title">GAMEPLAY AND SYSTEMS DEVELOPER</div>
          </div>

          <div style={{ position: 'relative', zIndex: 2, marginTop: '20px' }}>
            <div className="p5-stat-meta-row" style={{ paddingBottom: '10px' }}>
              <span className="p5-stat-meta-label" style={{ color: 'var(--p5-yellow)', fontSize: '1.2rem', fontFamily: 'var(--font-p5-header)', fontWeight: 900 }}>BIO</span>
            </div>
            <p style={{ fontSize: '0.95rem', lineHeight: '1.5', color: '#ccc' }}>
              Gameplay developer dedicated to designing responsive systems and immersive user layouts. 
              Experienced in structuring netcode architectures and camera setups that feel responsive and dynamic. 
              Always eager to polish features, learn new things, and write clean code.
            </p>
          </div>
        </motion.div>

        {/* Right Column: Statistics Grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          


          {/* Equipped Skills Panel */}
          <motion.div 
            className="p5-skills-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          >
            <h3>TECHNICAL SKILLS</h3>
            <div className="p5-skills-grid">
              {equippedSkills.map((skill, index) => (
                <motion.div 
                  key={index} 
                  className="p5-skill-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.05), type: 'spring' }}
                >
                  <span className="p5-skill-bullet">★</span>
                  <span>{skill}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Education & Qualifications Panel */}
          <motion.div 
            className="p5-skills-card"
            style={{ transform: 'rotate(-0.5deg)', boxShadow: '8px 8px 0 var(--p5-black)', border: '4px solid var(--p5-black)' }}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ type: 'spring', stiffness: 250, damping: 15 }}
          >
            <h3>EDUCATION & QUALIFICATIONS</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px' }}>
              <div style={{ borderLeft: '4px solid var(--p5-red)', paddingLeft: '15px' }}>
                <h4 style={{ fontFamily: 'var(--font-p5-header)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--p5-black)' }}>
                  BSc (Hons) Computer Games Design and Programming
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#555', margin: '2px 0 0 0', fontWeight: 700 }}>
                  Staffordshire University
                </p>
              </div>
              <div style={{ borderLeft: '4px solid var(--p5-red)', paddingLeft: '15px' }}>
                <h4 style={{ fontFamily: 'var(--font-p5-header)', fontWeight: 900, fontSize: '1.2rem', color: 'var(--p5-black)' }}>
                  A Levels
                </h4>
                <p style={{ fontSize: '0.95rem', color: '#555', margin: '2px 0 0 0', fontWeight: 700 }}>
                  Mathematics, Further Mathematics, Computer Science
                </p>
              </div>
            </div>
          </motion.div>

          {/* Scroll To Top Button */}
          <motion.button
            onClick={() => onNavClick('home')}
            className="p5-menu-item"
            style={{ fontSize: '1.8rem', alignSelf: 'flex-end', marginTop: '10px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            ▲ SCROLL TO TOP
          </motion.button>

        </div>
      </div>
    </div>
  );
};

export default About;
