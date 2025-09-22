import React from 'react';
import { projects } from '../data/projects';

const ProjectList: React.FC = () => {
    return (
        <div>
            <h2>Projects</h2>
            <ul>
                {projects.map((project) => (
                    <li key={project.id}>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            {project.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProjectList;