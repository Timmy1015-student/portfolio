import React from 'react';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';
import ExperienceList from '../components/ExperienceList';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <main>
                <section>
                    <h2>Projects</h2>
                    <ProjectList />
                </section>
                <section>
                    <h2>Experience</h2>
                    <ExperienceList />
                </section>
            </main>
        </div>
    );
};

export default Home;