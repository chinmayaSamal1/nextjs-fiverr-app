import React from 'react';
import Styles from '../styles/ProjectCard.module.css';

function ProjectCard({ card }) {
    return (
        <div className={Styles.projectCard}>
            <img src={card.img} alt="" />
            <div className={Styles.info}>
                <img src={card.pp} alt="" />
                <div className={Styles.texts}>
                    <h2>{card.cat}</h2>
                    <span>{card.username}</span>
                </div>
            </div>
        </div>
    );
}

export default ProjectCard;
