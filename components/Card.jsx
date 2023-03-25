import React from 'react';
import Link from 'next/link';
import Styles from '../styles/Card.module.css';

function CatCard({ card }) {
    return (
        <Link className={Styles.container} href="/gigs?cat=design">
            <div className={Styles.catCard}>
                <img src={card.img} alt="" />
                <span className={Styles.desc}>{card.desc}</span>
                <span className={Styles.title}>{card.title}</span>
            </div>
        </Link>
    );
}
export default CatCard;
