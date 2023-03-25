import React, { useState } from 'react';
import Styles from '../styles/Register.module.css';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { addUser } from '@/lib/helper';
import Loader from './Loader';
import ErrorModal from './ErrorModal';
import upload from '@/utils/upload';

function Register() {
    const [file, setFile] = useState(null);
    const [user, setUser] = useState({
        userName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        img: '',
        country: '',
        isSeller: false,
        desc: '',
    });
    let router = useRouter();

    const handleChange = (e) => {
        setUser((prev) => {
            return { ...prev, [e.target.name]: e.target.value };
        });
    };

    const handleSeller = (e) => {
        setUser((prev) => {
            return { ...prev, isSeller: e.target.checked };
        });
    };

    const addMutation = useMutation(addUser, {
        onSuccess: () => {
            console.log('Data inserted');
        },
    });
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = await upload(file);
        const formData = {
            ...user,
            img: url,
        };
        if (Object.keys(formData).length == 0) return console.log("Don't have form Data");
        addMutation.mutate(formData);
    };
    if (addMutation.data && addMutation.data.status === 'success') router.push('/login');
    if (addMutation && addMutation.isLoading) return <Loader />;
    return (
        <div>
            <div className={Styles.register}>
                <form onSubmit={handleSubmit}>
                    <div className={Styles.left}>
                        <h1>Create a new account</h1>
                        <label htmlFor="">Username</label>
                        <input name="userName" type="text" placeholder="johndoe" onChange={handleChange} />
                        <label htmlFor="">Email</label>
                        <input name="email" type="email" placeholder="email" onChange={handleChange} />
                        <label htmlFor="">Password</label>
                        <input name="password" type="password" onChange={handleChange} />
                        <label htmlFor="">Confirm Password</label>
                        <input name="passwordConfirm" type="password" onChange={handleChange} />
                        <label htmlFor="">Profile Picture</label>
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                        <label htmlFor="">Country</label>
                        <input name="country" type="text" placeholder="Usa" onChange={handleChange} />
                        <button type="submit">Register</button>
                    </div>
                    <div className={Styles.right}>
                        <h1>I want to become a seller</h1>
                        <div className={Styles.toggle}>
                            <label htmlFor="">Activate the seller account</label>
                            <label className={Styles.switch}>
                                <input type="checkbox" onChange={handleSeller} />
                                <span className={`${Styles.slider} ${Styles.round}`}></span>
                            </label>
                        </div>
                        <label htmlFor="">Phone Number</label>
                        <input name="phone" type="text" placeholder="+1 234 567 89" onChange={handleChange} />
                        <label htmlFor="">Description</label>
                        <textarea
                            placeholder="A short description of yourself"
                            name="desc"
                            id=""
                            cols="30"
                            rows="10"
                            onChange={handleChange}
                        ></textarea>
                    </div>
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

export default Register;
