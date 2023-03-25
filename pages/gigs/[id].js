import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Gig from '@/components/Gig';
import Loader from '@/components/Loader';

function page() {
    const router = useRouter();
    const { id } = router.query;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setReady(true);
        }
    }, [router.isReady]);

    if (ready) return <Gig id={id} />;
    else return <Loader />;
}

export default page;
