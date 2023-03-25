import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import avtar from '../public/noavatar.jpg';
import Styles from '../styles/Navbar.module.css';
import newRequest from '@/utils/newRequest';
import { useRouter } from 'next/router';

function Navbar() {
    const [active, setActive] = useState(false);
    const [open, setOpen] = useState(false);

    const [currentUser, setUser] = useState(null);
    const router = useRouter();

    // fetch data
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const data = JSON.parse(localStorage.getItem('currentUser'));
            setTimeout(setUser(data), 300);
        }
    }, []);

    const isActive = () => {
        window.scrollY > 0 ? setActive(true) : setActive(false);
    };

    useEffect(() => {
        window.addEventListener('scroll', isActive);
        return () => {
            window.removeEventListener('scroll', isActive);
        };
    }, []);

    const handleLogout = async () => {
        localStorage.clear('currentUser');
        try {
            await newRequest.post('/logOut');
            // setTimeout(router.push('/'), 1000);
            router.push('/')
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={active ? `${Styles.navbar} ${Styles.active}` : Styles.navbar}>
            <div className={Styles.container}>
                <div className={Styles.logo}>
                    <Link className={Styles.link} href="/">
                        <span className={Styles.text}>fiverr</span>
                    </Link>
                    <span className={Styles.dot}>.</span>
                </div>
                <div className={Styles.links}>
                    <span>Fiverr Business</span>
                    <span>Explore</span>
                    <span>English</span>
                    {!currentUser?.isSeller && <span>Become a Seller</span>}
                    {currentUser && currentUser !== 'undefined' ? (
                        <div className={Styles.user} onClick={() => setOpen(!open)}>
                            <Image src={currentUser.img || avtar} alt="image" />
                            <span>{currentUser?.userName}</span>
                            {open && (
                                <div className={Styles.options}>
                                    {currentUser.isSeller && (
                                        <>
                                            <Link className={Styles.link} href="/gigs">
                                                Gigs
                                            </Link>
                                            <Link className={Styles.link} href="/add">
                                                Add New Gig
                                            </Link>
                                        </>
                                    )}
                                    <Link className={Styles.link} href="/orders">
                                        Orders
                                    </Link>
                                    <Link className={Styles.link} href="/messages">
                                        Messages
                                    </Link>
                                    <Link className={Styles.link} href="/" onClick={handleLogout}>
                                        Logout
                                    </Link>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className={Styles.link}>
                                Sign in
                            </Link>
                            <Link className={Styles.link} href="/register">
                                <button>Join</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
            {active && (
                <>
                    <hr />
                    <div className={Styles.menu}>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Graphics & Design
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Video & Animation
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Writing & Translation
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            AI Services
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Digital Marketing
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Music & Audio
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Programming & Tech
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Business
                        </Link>
                        <Link className={`${Styles.link} ${Styles.menuLink}`} href="/">
                            Lifestyle
                        </Link>
                    </div>
                    <hr />
                </>
            )}
        </div>
    );
}

export default Navbar;
