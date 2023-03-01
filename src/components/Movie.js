import React, { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { UserAuth } from '../Context/AuthContext';
import { db } from '../firebase';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const Movie = ({ movie, setSelectedMovie }) => {
    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { user } = UserAuth();
    const navigate = useNavigate();

    const movieID = doc(db, 'users', `${user?.email}`);

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: movie.id,
                    title: movie.title,
                    img: movie.backdrop_path,
                    release_date: movie.release_date,
                    overview: movie.overview
                })
            })
        } else {
            alert('Please Log in to save a movie');
        }
    }

    const showMovieInfo = (movie) => {
        setSelectedMovie(movie);
        navigate('/movieinfo');
    }

    return (
        <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
            <img
                className='w-full h-auto block'
                src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}
            />
            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100'>
                <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full'>{movie?.title}</p>
                <p onClick={saveShow}>
                    {like ? <FaHeart className='absolute top-4 left-4 text-gray-300' /> : <FaRegHeart className='absolute top-4 left-4 text-gray-300' />}
                </p>
                <button onClick={() => showMovieInfo(movie)} className='absolute bottom-5 w-20 left-0 right-0 my-auto mx-auto bg-slate-400 rounded py-2 px-3 hover:bg-slate-600'>Info</button>
            </div>
        </div>
    )
}

export default Movie;