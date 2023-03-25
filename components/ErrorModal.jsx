import React from 'react';
import Styles from '../styles/Error.module.css';

function ErrorModal({ message }) {
    return (
        <div className={Styles.container}>
            <div className={Styles.error}>{message}</div>
        </div>
    );
}

export default ErrorModal;
