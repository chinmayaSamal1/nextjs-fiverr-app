import React, { useEffect, useState } from 'react';
import Styles from '../styles/Orders.module.css';
import { useQuery } from 'react-query';
import newRequest from '@/utils/newRequest';
import Image from 'next/image';
import message from '../public/message.png';
import Loader from './Loader';

const Orders = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        }
    }, []);
    const { isLoading, error, data } = useQuery({
        queryKey: ['orders'],
        queryFn: () =>
            newRequest.get(`/orders`).then((res) => {
                return res.data;
            }),
    });

    const handleContact = async (order) => {
        const sellerId = order.sellerId;
        const buyerId = order.buyerId;
        const id = sellerId + buyerId;

        try {
            const res = await newRequest.get(`/getConversation?id=${id}`);
            navigate(`/message?id=${res.data.id}`);
        } catch (err) {
            if (err.response.status === 404) {
                const res = await newRequest.post(`/conversation`, {
                    to: currentUser.seller ? buyerId : sellerId,
                });
                navigate(`/message?id=${res.data.id}`);
            }
        }
    };
    return (
        <div className={Styles.orders}>
            {isLoading ? (
                <Loader />
            ) : error ? (
                'error'
            ) : (
                <div className={Styles.container}>
                    <div className={Styles.title}>
                        <h1>Orders</h1>
                    </div>
                    <table>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Contact</th>
                        </tr>
                        {data.orders.map((order) => (
                            <tr key={order._id}>
                                <td>
                                    <img className={Styles.message} src={order.img} alt="" />
                                </td>
                                <td>{order.title}</td>
                                <td>{order.price}</td>
                                <td>
                                    <Image
                                        className={Styles.image}
                                        src={message}
                                        alt=""
                                        onClick={() => handleContact(order)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    );
};

export default Orders;
