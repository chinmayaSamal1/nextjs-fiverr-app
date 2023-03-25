import React, { useRef } from 'react';
import CatCard from './Card';
import { cards } from '../utils/data';
import Styles from '../styles/ImageCarousel.module.css';

function ImageCarouselCards() {
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
                {cards.map((card) => (
                    <CatCard key={card.id} card={card} />
                ))}
            </div>
        </div>
    );
}

export default ImageCarouselCards;
