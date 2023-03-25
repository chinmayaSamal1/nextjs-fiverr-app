import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { logIn } from '@/lib/helper';
import Styles from '../styles/Login.module.css';
import Loader from './Loader';
import ErrorModal from './ErrorModal';
import { useRouter } from 'next/router';

function login() {
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    let router = useRouter();

    const addMutation = useMutation(logIn, {
        onSuccess: () => {
            console.log('Data inserted');
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            userName,
            password,
        };
        if (Object.keys(formData).length == 0) return console.log("Don't have form Data");
        addMutation.mutate(formData);
    };

    if (addMutation.data && addMutation.data.status === 'success') {
        if (typeof window !== 'undefined') {
            localStorage.setItem('currentUser', JSON.stringify(addMutation.data.data.user));
            router.push('/');
        }
    }
    if (addMutation && addMutation.isLoading) return <Loader />;
    return (
        <div>
            <div className={Styles.login}>
                <form onSubmit={handleSubmit}>
                    <h1>Sign in</h1>
                    <label htmlFor="">Username</label>
                    <input
                        name="user name"
                        type="text"
                        placeholder="john doe"
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <label htmlFor="">Password</label>
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            {addMutation.data && addMutation.data.status === 'fail' ? (
                <ErrorModal message={addMutation.data.message} />
            ) : (
                <></>
            )}
        </div>
    );
}

export default login;
