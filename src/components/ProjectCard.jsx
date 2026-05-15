import React from 'react';
import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ id, title, genre, imagePlaceholder }) => {
  return (
    <Link to={`/project/${id}`} className="project-card-link">
      <div className="project-card jagged-border">
        <div className="project-image-container">
          <div className="image-placeholder">
            {imagePlaceholder || 'GAME SCREENSHOT'}
          </div>
        </div>
        <div className="project-info">
          <h2 className="project-title text-stroke">{title}</h2>
          <div className="project-genre jagged-border-alt">{genre}</div>
        </div>
        <div className="hover-overlay">
          <span className="overlay-text">VIEW INTEL</span>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
