import { deleteUser } from '@/lib/helper';
import { useState } from 'react';
import { useQuery } from 'react-query';

function Delete(props) {
    const [data, setData] = useState();
    const clickHandler = async () => {
        const tempdata = await deleteUser(props.id);
        setData(tempdata);
    };
    if (data && data.status === 'success') return <div>success</div>;
    if (data && data.status === 'failed') return <div>{data.message}</div>;
    return <div onClick={clickHandler}>button</div>;
}

export default Delete;
