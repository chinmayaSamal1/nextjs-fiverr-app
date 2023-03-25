import { useMutation, useQuery, useQueryClient } from 'react-query';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Loader from './Loader';
import Styles from '../styles/Message.module.css';
import newRequest from '@/utils/newRequest';
import ErrorModal from './ErrorModal';

const Message = ({ id }) => {
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setCurrentUser(JSON.parse(localStorage.getItem('currentUser')));
        }
    }, []);
    console.log(id);

    const queryClient = useQueryClient();

    const { isLoading, error, data } = useQuery({
        queryKey: ['messages'],
        queryFn: () =>
            newRequest.get(`/message?id=${id}`).then((res) => {
                return res.data;
            }),
    });

    const mutation = useMutation({
        mutationFn: (message) => {
            return newRequest.post(`/message`, message);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['messages']);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({
            conversationId: id,
            desc: e.target[0].value,
        });
        e.target[0].value = '';
    };
    if (error) console.log(error);

    return (
        <div className={Styles.message}>
            <div className={Styles.container}>
                <span className={Styles.breadcrumbs}>
                    <Link href="/messages">Messages</Link> {'>'} John Doe {'>'}
                </span>
                {isLoading ? (
                    <Loader />
                ) : error ? (
                    'error'
                ) : (
                    <div className={Styles.messages}>
                        {data.map((m) => (
                            <div
                                className={
                                    m.userId === currentUser._id ? `${Styles.owner} ${Styles.item}` : `${Styles.item}`
                                }
                                key={m._id}
                            >
                                <img
                                    src="https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600"
                                    alt=""
                                />
                                <p>{m.desc}</p>
                            </div>
                        ))}
                    </div>
                )}
                <hr />
                <form className={Styles.write} onSubmit={handleSubmit}>
                    <textarea type="text" placeholder="write a message" />
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    );
};

export default Message;
