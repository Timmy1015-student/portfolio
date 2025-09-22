import React from 'react';
import experiences from '../data/experiences';

const ExperienceList: React.FC = () => {
    return (
        <div>
            <h2>經歷</h2>
            <ul>
                {experiences.map((experience) => (
                    <li key={experience.id}>
                        <a href={experience.link} target="_blank" rel="noopener noreferrer">
                            {experience.title}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExperienceList;