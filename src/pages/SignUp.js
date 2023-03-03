import { async } from '@firebase/util';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import backgroundImg from '../assets/images/bacnkground_movie_posters.jpg';
import { UserAuth } from '../Context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user, signUp } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <div className='w-full h-screen'>
                <img src={backgroundImg} className='hidden sm:block absolute w-full object-cover'></img>
                <div className='absolute bg-gradient-to-b from-black top-0 w-full h-screen'></div>
                <div className='fixed w-full px-4 py-24 z-50'>
                    <div className='max-w-[450px] h-[600px] mx-auto bg-black/75'>
                        <div className='max-w-[320px] mx-auto py-16'>
                            <h1 className='text-3xl font-bold'>Sign Up</h1>
                            <form onSubmit={handleSubmit} className='flex w-full flex-col py-4'>
                                <input
                                    onChange={(e) => setEmail(e.target.value)}
                                    className='p-3 my-2 bg-gray-500 rounded'
                                    type='email'
                                    placeholder='...@google.com'
                                    autoComplete='email'
                                    required />
                                <input
                                    onChange={(e) => setPassword(e.target.value)}
                                    className='p-3 my-2 bg-gray-500 rounded'
                                    type='password'
                                    placeholder='Password'
                                    autoComplete='current-password'
                                    min={6}
                                    required />
                                <button className='bg-red-600 py-3 my-6 rounded font-bold'>Sign Up</button>
                                <div className='flex justify-between text-gray-600'>
                                    <p><input type='checkbox' className='mr-2' />Remember Me</p>
                                    <p>Need Help?</p>
                                </div>
                                <p className='py-4'>
                                    <span className='text-gray-600 mr-2'>Already Subscribed?</span>
                                    <Link to='/login'>Sign In</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp