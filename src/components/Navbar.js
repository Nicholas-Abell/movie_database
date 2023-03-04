import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      await logOut();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='flex items-center justify-between p-4 z-30 w-full absolute'>
      <Link to='/'>
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer'>Movie Database</h1>
      </Link>
      {
        user?.email
          ? (
            <div>
              <Link to='/account'>
                <button className='pr-4'>Account</button>
              </Link>
              <button onClick={handleLogOut} className='bg-red-600 px-6 py-2 rounded cursor-pointer'>Log Out</button>
            </div>
          )
          : (
            <div>
              <Link to='/login'>
                <button className='pr-4'>Log In</button>
              </Link>
              <Link to='/signup'>
                <button className='bg-red-600 px-6 py-2 rounded cursor-pointer'>Sign Up</button>
              </Link>
            </div>
          )
      }
    </div>
  )
}

export default Navbar