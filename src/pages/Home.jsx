import React from 'react';
import { motion } from 'framer-motion';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import Qualifications from '../components/Qualifications';
import './Home.css';

const MOCK_PROJECTS = [
  {
    id: 'project-1',
    title: 'NEON DRIFTER',
    genre: 'RACING / ACTION',
    imagePlaceholder: 'SCREENSHOT 01'
  },
  {
    id: 'project-2',
    title: 'VOID KNIGHT',
    genre: 'ACTION RPG',
    imagePlaceholder: 'SCREENSHOT 02'
  },
  {
    id: 'project-3',
    title: 'CHRONO SHIFT',
    genre: 'PUZZLE PLATFORMER',
    imagePlaceholder: 'SCREENSHOT 03'
  }
];

const Home = () => {
  return (
    <div className="home-page">
      <Hero />
      
      <Qualifications />
      
      <motion.section 
        className="projects-section"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, type: 'spring', bounce: 0.4 }}
      >
        <motion.div 
          className="section-header jagged-border"
          initial={{ x: -200, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 120, delay: 0.2 }}
        >
          <h2 className="section-title text-stroke">MISSIONS</h2>
        </motion.div>
        
        <div className="projects-grid">
          {MOCK_PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
            >
              <ProjectCard {...project} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Home;
