import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();

  // In a real app, you would fetch project details based on the ID.
  // Using placeholder data for now.
  const projectName = id.replace('project-', '').toUpperCase() + ' TITLE';

  return (
    <div className="project-details-page">
      <div className="details-header jagged-border">
        <h1 className="details-title text-stroke">{projectName}</h1>
      </div>
      
      <div className="details-content">
        <div className="main-visual jagged-border">
          <div className="visual-placeholder">
            GAMEPLAY VIDEO / SCREENSHOT PLACEHOLDER
          </div>
        </div>
        
        <div className="info-panel jagged-border-alt">
          <h2>MISSION BRIEFING</h2>
          <p>
            This is a placeholder description for the project. In the final version, this section
            will contain details about the game's mechanics, your role in its development,
            and any other interesting insights. The jagged borders and high contrast maintain
            the Persona 5 style across all pages.
          </p>
          <div className="tech-stack">
            <span className="tech-tag">UNITY</span>
            <span className="tech-tag">C#</span>
            <span className="tech-tag">BLENDER</span>
          </div>
          
          <Link to="/" className="back-button jagged-border">
            &lt; RETURN TO BASE
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
