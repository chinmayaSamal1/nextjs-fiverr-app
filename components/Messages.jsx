import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import newRequest from '@/utils/newRequest';
import Styles from '../styles/Messages.module.css';
import moment from 'moment';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import Loader from './Loader';

const Messages = () => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        }

    }, []);
    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ['conversations'],
        queryFn: () =>
            newRequest.get(`/conversation`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (id) => {
            return newRequest.put(`/conversation?id=${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['conversation']);
        },
    });

    const handleRead = (id) => {
        mutation.mutate(id);
    };

    return (
        <div className={Styles.messages}>
            {isLoading ? (
                <Loader />
            ) : error ? (
                'error'
            ) : (
                <div className={Styles.container}>
                    <div className={Styles.title}>
                        <h1>Messages</h1>
                    </div>
                    <table>
                        <tr>
                            <th>{currentUser && currentUser.isSeller ? 'Buyer' : 'Seller'}</th>
                            <th>Last Message</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        {data.map((c) => (
                            <tr
                                className={
                                    ((currentUser?.isSeller && !c.readBySeller) ||
                                        (!currentUser?.isSeller && !c.readByBuyer)) &&
                                    `${Styles.active}`
                                }
                                key={c.id}
                            >
                                <td>{currentUser?.isSeller ? c.buyerId : c.sellerId}</td>
                                <td>
                                    <Link href={`/messages/${c.id}`} className={Styles.link}>
                                        {c?.lastMessage?.substring(0, 100)}...
                                    </Link>
                                </td>
                                <td>{moment(c.updatedAt).fromNow()}</td>
                                <td>
                                    {((currentUser?.isSeller && !c.readBySeller) ||
                                        (!currentUser?.isSeller && !c.readByBuyer)) && (
                                        <button onClick={() => handleRead(c.id)}>Mark as Read</button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </table>
                </div>
            )}
        </div>
    );
};

export default Messages;
