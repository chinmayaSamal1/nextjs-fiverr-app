import React from 'react';
// import { Slider } from 'infinite-react-carousel/lib';
import Link from 'next/link';
import { useQuery } from 'react-query';
import newRequest from '@/utils/newRequest';
import Reviews from './Reviews';
import Styles from '../styles/Gig.module.css';
import Loader from './Loader';
import avatar from '../public/noavatar.jpg';
import star from '../public/star.png';
import Image from 'next/image';

function Gig({ id }) {
    const { isLoading, error, data } = useQuery({
        queryKey: ['gig'],
        queryFn: () =>
            newRequest.get(`/gig?id=${id}`).then((res) => {
                return res.data.gig;
            }),
    });
    const userId = data?.userId;

    const {
        isLoading: isLoadingUser,
        error: errorUser,
        data: dataUser,
    } = useQuery({
        queryKey: ['user'],
        queryFn: () =>
            newRequest.get(`/getUser?id=${userId}`).then((res) => {
                return res.data;
            }),
        enabled: !!userId,
    });

    return (
        <div className={Styles.gig}>
            {isLoading ? (
                <Loader />
            ) : error ? (
                <div>Something went wrong</div>
            ) : (
                <div className={Styles.container}>
                    <div className={Styles.left}>
                        <span className={Styles.breadcrumbs}>
                            Fiverr {'>'} Graphics & Design {'>'}
                        </span>
                        <h1>{data.title}</h1>
                        {isLoadingUser ? (
                            <Loader />
                        ) : errorUser ? (
                            <div>Something went wrong</div>
                        ) : (
                            <div className={Styles.user}>
                                <Image className={Styles.pp} src={dataUser.img || avatar} alt="" />
                                <img />
                                <span>{dataUser.username}</span>
                                {!isNaN(data.totalStars / data.starNumber) && (
                                    <div className={Styles.stars}>
                                        {Array(Math.round(data.totalStars / data.starNumber))
                                            .fill()
                                            .map((item, i) => (
                                                <Image src={star} alt="" key={i} />
                                            ))}
                                        <span>{Math.round(data.totalStars / data.starNumber)}</span>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* <Slider slidesToShow={1} arrowsScroll={1} className={Styles.slider}>
                            {data.images.map((img) => (
                                <img key={img} src={img} alt="" />
                            ))}
                        </Slider> */}
                        <h2>About This Gig</h2>
                        <p>{data.desc}</p>
                        {isLoadingUser ? (
                            <Loader />
                        ) : errorUser ? (
                            <div>Something went wrong</div>
                        ) : (
                            <div className={Styles.seller}>
                                <h2>About The Seller</h2>
                                <div className={Styles.user}>
                                    <Image src={dataUser.img || avatar} alt="" />
                                    <div className={Styles.info}>
                                        <span>{dataUser.username}</span>
                                        {!isNaN(data.totalStars / data.starNumber) && (
                                            <div className={Styles.stars}>
                                                {Array(Math.round(data.totalStars / data.starNumber))
                                                    .fill()
                                                    .map((item, i) => (
                                                        <Image src={star} alt="" key={i} />
                                                    ))}
                                                <span>{Math.round(data.totalStars / data.starNumber)}</span>
                                            </div>
                                        )}
                                        <button>Contact Me</button>
                                    </div>
                                </div>
                                <div className={Styles.box}>
                                    <div className={Styles.items}>
                                        <div className={Styles.item}>
                                            <span className={Styles.title}>From</span>
                                            <span className={Styles.desc}>{dataUser.country}</span>
                                        </div>
                                        <div className={Styles.item}>
                                            <span className={Styles.title}>Member since</span>
                                            <span className={Styles.desc}>Aug 2022</span>
                                        </div>
                                        <div className={Styles.item}>
                                            <span className={Styles.title}>Avg. response time</span>
                                            <span className={Styles.desc}>4 hours</span>
                                        </div>
                                        <div className={Styles.item}>
                                            <span className={Styles.title}>Last delivery</span>
                                            <span className={Styles.desc}>1 day</span>
                                        </div>
                                        <div className={Styles.item}>
                                            <span className={Styles.title}>Languages</span>
                                            <span className={Styles.desc}>English</span>
                                        </div>
                                    </div>
                                    <hr />
                                    <p>{dataUser.desc}</p>
                                </div>
                            </div>
                        )}
                        <Reviews gigId={id} />
                    </div>
                    <div className={Styles.right}>
                        <div className={Styles.price}>
                            <h3>{data.shortTitle}</h3>
                            <h2>$ {data.price}</h2>
                        </div>
                        <p>{data.shortDesc}</p>
                        <div className={Styles.details}>
                            <div className={Styles.item}>
                                <img src="/img/clock.png" alt="" />
                                <span>{data.deliveryDate} Days Delivery</span>
                            </div>
                            <div className={Styles.item}>
                                <img src="/img/recycle.png" alt="" />
                                <span>{data.revisionNumber} Revisions</span>
                            </div>
                        </div>
                        <div className={Styles.features}>
                            {data.features.map((feature) => (
                                <div className={Styles.item} key={feature}>
                                    <img src="/img/greencheck.png" alt="" />
                                    <span>{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Link href={`/pay/${id}`}>
                            <button>Continue</button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Gig;
