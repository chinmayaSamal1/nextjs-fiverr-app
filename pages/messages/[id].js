import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loader from '@/components/Loader';
import Message from '@/components/Message';

function page() {
    const router = useRouter();
    const { id } = router.query;
    const [ready, setReady] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setReady(true);
        }
    }, [router.isReady]);

    if (ready) return <Message id={id} />;
    else return <Loader />;
}

export default page;