import React from 'react';
import Featured from './Featured';
import TrustedBy from './TrustedBy';
import Styles from '../styles/Home.module.css';
import check from '../public/check.png';
import Image from 'next/image';
import ImageCarouselCards from './ImageCarouselCards';
import ImageCarouselProject from './ImageCarouselProduct';

function Home() {
    return (
        <div className={Styles.home}>
            <Featured />
            <TrustedBy />
            <ImageCarouselCards />

            <div className={Styles.features}>
                <div className={Styles.container}>
                    <div className={Styles.item}>
                        <h1>A whole world of freelance talent at your fingertips</h1>
                        <div className={Styles.title}>
                            <Image src={check} alt="" />
                            The best for every budget
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates, just project-based
                            pricing.
                        </p>
                        <div className={Styles.title}>
                            <Image src={check} alt="" />
                            Quality work done quickly
                        </div>
                        <p>Find the right freelancer to begin working on your project within minutes.</p>
                        <div className={Styles.title}>
                            <Image src={check} alt="" />
                            Protected payments, every time
                        </div>
                        <p>
                            Always know what you'll pay upfront. Your payment isn't released until you approve the work.
                        </p>
                        <div className={Styles.title}>
                            <Image src={check} alt="" />
                            24/7 support
                        </div>
                        <p>
                            Find high-quality services at every price point. No hourly rates, just project-based
                            pricing.
                        </p>
                    </div>
                    <div className={Styles.item}>
                        <video src="./img/video.mp4" controls />
                    </div>
                </div>
            </div>
            <div className={Styles.explore}>
                <div className={Styles.container}>
                    <h1>Explore the marketplace</h1>
                    <div className={Styles.items}>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Graphics & Design</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>

                            <span>Digital Marketing</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Writing & Translation</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Video & Animation</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Music & Audio</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Programming & Tech</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Business</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Lifestyle</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Data</span>
                        </div>
                        <div className={Styles.item}>
                            <img
                                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                                alt=""
                            />
                            <div className={Styles.line}></div>
                            <span>Photography</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${Styles.features} ${Styles.dark}`}>
                <div className={Styles.container}>
                    <div className={Styles.item}>
                        <h1>
                            fiverr <i>business</i>
                        </h1>
                        <h1>
                            A business solution designed for <i>teams</i>
                        </h1>
                        <p>Upgrade to a curated experience packed with tools and benefits, dedicated to businesses</p>
                        <div className={Styles.title}>
                            <Image src={check} alt="" />
                            Connect to freelancers with proven business experience
                        </div>

                        <div className={Styles.title}>
                            <Image src={check} alt="" />
                            Get matched with the perfect talent by a customer success manager
                        </div>

                        <div className={Styles.title}>
                            <Image src={check} alt="" />
                            Manage teamwork and boost productivity with one powerful workspace
                        </div>
                        <button>Explore Fiverr Business</button>
                    </div>
                    <div className={Styles.item}>
                        <img
                            src="https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_2.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624768/business-desktop-870-x2.png"
                            alt=""
                        />
                    </div>
                </div>
            </div>
            <ImageCarouselProject />
        </div>
    );
}

export default Home;
