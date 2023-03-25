import React from 'react';
import Styles from '../styles/Review.module.css';
import newRequest from '@/utils/newRequest';
import { useQuery } from 'react-query';
import Loader from './Loader';
import Image from 'next/image';
import avatar from '../public/noavatar.jpg';
import star from '../public/star.png';
import like from '../public/like.png';
import dislike from '../public/dislike.png';

const Review = ({ review }) => {
    const { isLoading, error, data } = useQuery({
        queryKey: [review.userId],
        queryFn: () =>
            newRequest.get(`/getUser?id=${review.userId}`).then((res) => {
                return res.data.user;
            }),
    });

    return (
        <div className={Styles.review}>
            {isLoading ? (
                <Loader />
            ) : error ? (
                'error'
            ) : (
                <div className={Styles.user}>
                    <Image className={Styles.pp} src={data.img || avatar} alt="" />
                    <div className={Styles.info}>
                        <span>{data.userName}</span>
                        <div className={Styles.country}>
                            <span>{data.country}</span>
                        </div>
                    </div>
                </div>
            )}
            <div className={Styles.stars}>
                {Array(review.stars)
                    .fill()
                    .map((item, i) => (
                        <Image src={star} alt="" key={i} />
                    ))}
                <span>{review.star}</span>
            </div>
            <p>{review.desc}</p>
            <div className={Styles.helpful}>
                <span>Helpful?</span>
                <Image src={like} alt="" />
                <span>Yes</span>
                <Image src={dislike} alt="" />
                <span>No</span>
            </div>
        </div>
    );
};

export default Review;
