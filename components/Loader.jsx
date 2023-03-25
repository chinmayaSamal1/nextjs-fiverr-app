import React from 'react';
import Styles from '../styles/Loader.module.css';

function Loader() {
    return (
        <div className={Styles.container}>
            <div className={Styles.wrapper}>
                <div className={Styles.circle}></div>
                <div className={Styles.circle}></div>
                <div className={Styles.circle}></div>
                <div className={Styles.shadow}></div>
                <div className={Styles.shadow}></div>
                <div className={Styles.shadow}></div>
                <span>Loading</span>
            </div>
        </div>
    );
}

export default Loader;
