import React from 'react';
import newRequest from '@/utils/newRequest';
import Review from './Review';
import Styles from '../styles/Reviews.module.css';
import { useQueryClient, useQuery } from 'react-query';
import { useMutation } from 'react-query';
import Loader from './Loader';
import ErrorModal from './ErrorModal';

const Reviews = ({ gigId }) => {
    const queryClient = useQueryClient();
    const { isLoading, error, data } = useQuery({
        queryKey: ['reviews'],
        queryFn: () =>
            newRequest.get(`/review?id=${gigId}`).then((res) => {
                return res.data.reviews;
            }),
    });

    const mutation = useMutation({
        mutationFn: (review) => {
            return newRequest.post('/review', review);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['review']);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const desc = e.target[0].value;
        const star = e.target[1].value;
        mutation.mutate({ gigId, desc, star });
    };

    return (
        <div className={Styles.review}>
            <h2>Reviews</h2>
            {isLoading ? (
                <Loader />
            ) : error ? (
                'Something went wrong!'
            ) : (
                data.map((review) => <Review key={review._id} review={review} />)
            )}
            <div className={Styles.ad}>
                <h3>Add a review</h3>
                <form action="" className={Styles.addForm} onSubmit={handleSubmit}>
                    <input type="text" placeholder="write your opinion" />
                    <select name="" id="">
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button>Send</button>
                </form>
            </div>
            {mutation.data && mutation.data.data.status === 'failed' ? (
                <ErrorModal message={mutation.data.data.message} />
            ) : (
                <></>
            )}
        </div>
    );
};

export default Reviews;
