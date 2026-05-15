import React from 'react';
import { motion } from 'framer-motion';
import './Qualifications.css';

const qualificationsList = [
  {
    category: 'SKILLS',
    items: ['C++', 'C#', 'Unreal Engine', 'Unity', 'HLSL / Shaders', '3D Math']
  },
  {
    category: 'EXPERIENCE',
    items: ['Lead Gameplay Programmer @ Indie Studio', 'Game Jam Winner 2025', 'Open Source Contributor']
  },
  {
    category: 'EDUCATION',
    items: ['B.S. Computer Science', 'Specialization in Computer Graphics']
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { x: -100, opacity: 0, skewX: -20 },
  visible: { x: 0, opacity: 1, skewX: 0, transition: { type: 'spring', stiffness: 100 } }
};

const Qualifications = () => {
  return (
    <section className="qualifications-section">
      <motion.div 
        className="section-header jagged-border-alt"
        initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
        whileInView={{ scale: 1, opacity: 1, rotate: -2 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ type: "spring", bounce: 0.5 }}
      >
        <h2 className="section-title text-stroke">CONFIDENTIAL INTEL</h2>
        <span className="subtitle">QUALIFICATIONS & RECORD</span>
      </motion.div>

      <motion.div 
        className="qualifications-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {qualificationsList.map((qual, index) => (
          <motion.div key={index} className="qual-card jagged-border" variants={itemVariants}>
            <div className="qual-header">
              <h3>{qual.category}</h3>
            </div>
            <ul className="qual-list">
              {qual.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Qualifications;
