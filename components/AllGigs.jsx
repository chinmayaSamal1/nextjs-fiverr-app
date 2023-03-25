import React, { useEffect, useRef, useState } from 'react';
import Styles from '../styles/AllGigs.module.css';
import newRequest from '@/utils/newRequest';
import GigCard from './GigCard';
import { useQuery } from 'react-query';
import Loader from './Loader';

function AllGigs() {
    const [sort, setSort] = useState('sales');
    const [open, setOpen] = useState(false);
    const minRef = useRef();
    const maxRef = useRef();

    const { isLoading, error, data, refetch } = useQuery({
        queryKey: 'Allgigs',
        queryFn: () =>
            newRequest
                .get(`/allGigs?min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`)
                .then((res) => {
                    return res.data;
                }),
    });

    const reSort = (type) => {
        setSort(type);
        setOpen(false);
    };
    useEffect(() => {
        refetch();
    }, [sort]);

    const apply = () => {
        refetch();
    };

    return (
        <div className={Styles.gigs}>
            <div className={Styles.container}>
                <span className={Styles.breadcrumbs}>
                    Liverr {'>'} Graphics & Design {'>'}
                </span>
                <h1>AI Artists</h1>
                <p>Explore the boundaries of art and technology with Liverr's AI artists</p>
                <div className={Styles.menu}>
                    <div className={Styles.left}>
                        <span>Budget</span>
                        <input ref={minRef} type="number" placeholder="min" />
                        <input ref={maxRef} type="number" placeholder="max" />
                        <button onClick={apply}>Apply</button>
                    </div>
                    <div className={Styles.right}>
                        <span className={Styles.sortBy}>Sort by</span>
                        <span className={Styles.sortType}>{sort === 'sales' ? 'Best Selling' : 'Newest'}</span>
                        <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
                        {open && (
                            <div className={Styles.rightMenu}>
                                {sort === 'sales' ? (
                                    <span onClick={() => reSort('createdAt')}>Newest</span>
                                ) : (
                                    <span onClick={() => reSort('sales')}>Best Selling</span>
                                )}
                                <span onClick={() => reSort('sales')}>Popular</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className={Styles.cards}>
                    {isLoading ? (
                        <Loader />
                    ) : error ? (
                        { error }
                    ) : (
                        data.gigs.map((gig) => <GigCard key={gig._id} item={gig} />)
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllGigs;
