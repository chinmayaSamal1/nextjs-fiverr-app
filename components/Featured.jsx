import React, { useState } from 'react';
import Styles from '../styles/Featured.module.css';
import Image from 'next/image';
import search from '../public/search.png';
import man from '../public/mman.png'
// import { useNavigate } from 'react-router-dom';

function Featured() {
    const [input, setInput] = useState('');
    // const navigate = useNavigate();

    const handleSubmit = () => {
        navigate(`/gigs?search=${input}`);
    };
    return (
        <div className={Styles.featured}>
            <div className={Styles.container}>
                <div className={Styles.left}>
                    <h1>
                        Find the perfect <span>freelance</span> services for your business
                    </h1>
                    <div className={Styles.search}>
                        <div className={Styles.searchInput}>
                            <Image src={search} alt="search"/>
                            <input
                                type="text"
                                placeholder='Try "building mobil app"'
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </div>
                        <button onClick={handleSubmit}>Search</button>
                    </div>
                    <div className={Styles.popular}>
                        <span>Popular:</span>
                        <button>Web Design</button>
                        <button>WordPress</button>
                        <button>Logo Design</button>
                        <button>AI Services</button>
                    </div>
                </div>
                <div className={Styles.right}>
                    <Image src={man} alt="image" />
                </div>
            </div>
        </div>
    );
}

export default Featured;
