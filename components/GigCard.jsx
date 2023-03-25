import React from 'react';
import Styles from '../styles/GigCard.module.css';
import Link from 'next/link';
import { useQuery } from 'react-query';
import Loader from './Loader';
import newRequest from '@/utils/newRequest';
import avatar from '../public/noavatar.jpg';
import star from '../public/star.png';
import heart from '../public/heart.png';
import Image from 'next/image';

const GigCard = ({ item }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [item.userId],
        queryFn: () =>
            newRequest.get(`/getUser?id=${item.userId}`).then((res) => {
                return res.data;
            }),
    });
    return (
        <Link href={`/gigs/${item._id}`} className={Styles.link}>
            <div className={Styles.gigCard}>
                <img src={item.cover} alt="" />
                <div className={Styles.info}>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        { error }
                    ) : (
                        <div className={Styles.user}>
                            <Image src={data.img || avatar} alt="" />
                            <span>{data.username}</span>
                        </div>
                    )}
                    <p>{item.desc}</p>
                    <div className={Styles.star}>
                        <Image src={star} alt="" />
                        <span>
                            {!isNaN(item.totalStars / item.starNumber) && Math.round(item.totalStars / item.starNumber)}
                        </span>
                    </div>
                </div>
                <hr />
                <div className={Styles.detail}>
                    <Image src={heart} alt="" />
                    <div className={Styles.price}>
                        <span>STARTING AT</span>
                        <h2>$ {item.price}</h2>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default GigCard;
