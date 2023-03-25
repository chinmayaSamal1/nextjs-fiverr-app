import React, { useRef } from 'react';
import { projects } from '../utils/data';
import ProjectCard from './ProjectCard';
import Styles from '../styles/ImageCarousel.module.css';

function ImageCarouselProject() {
    // const box = document.querySelector('.productContainer');
    const box = useRef();

    const btnPressPrev = () => {
        let width = box.current.clientWidth;
        box.current.scrollLeft = box.current.scrollLeft - width;
    };
    const btnPressNext = () => {
        let width = box.current.clientWidth;
        box.current.scrollLeft = box.current.scrollLeft + width;
    };
    return (
        <div className={Styles.productCarousel}>
            <button className={Styles.preBtn} onClick={btnPressPrev}>
                <p>&lt;</p>
            </button>
            <button className={Styles.nextBtn} onClick={btnPressNext}>
                <p>&gt;</p>
            </button>
            <div className={Styles.productContainer} ref={box}>
                {projects.map((project) => (
                    <ProjectCard key={project.id} card={project} />
                ))}
            </div>
        </div>
    );
}

export default ImageCarouselProject;
