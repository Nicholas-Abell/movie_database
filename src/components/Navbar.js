import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import { AiOutlineSearch } from 'react-icons/ai'

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
        <h1 className='text-red-600 text-4xl font-bold cursor-pointer hover:text-red-800'>Movie Database</h1>
      </Link>
      <div className='flex justify-center items-center gap-4'>
        <Link to='/search'>
          <AiOutlineSearch size={25} className='hover:text-gray-500' />
        </Link>
        {
          user?.email
            ? (
              <div>
                <Link to='/account'>
                  <button className='pr-4 hover:text-gray-500'>Account</button>
                </Link>
                <button onClick={handleLogOut} className='bg-red-600 px-6 py-2 rounded cursor-pointer hover:bg-red-800'>Log Out</button>
              </div>
            )
            : (
              <div>
                <Link to='/login'>
                  <button className='pr-4 hover:text-gray-500'>Log In</button>
                </Link>
                <Link to='/signup'>
                  <button className='bg-red-600 px-6 py-2 rounded cursor-pointer hover:bg-red-800'>Sign Up</button>
                </Link>
              </div>
            )
        }
      </div>
    </div>
  )
}

export default Navbar