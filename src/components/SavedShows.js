import React, { useState, useEffect, useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { updateDoc, doc, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { SelectedMovie } from '../context/SelectedMovieContext';

const SavedShows = () => {
    const { setSelectedMovie } = SelectedMovie();
    const [movies, setMovies] = useState([]);
    const { user } = UserAuth();
    const movieRef = doc(db, 'users', `${user?.email}`);
    const navigate = useNavigate();

    const showMovieInfo = (movie) => {
        setSelectedMovie(movie);
        navigate('/movieinfo');
        console.log('from acoount: ' + movie)
    }

    const showMovieTrailer = (movie) => {
        setSelectedMovie(movie);
        navigate('/trailer');
    }

    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    const deleteMovie = async (id) => {
        try {
            const res = movies.filter((movie) => movie.id !== id);
            await updateDoc(movieRef, {
                savedShows: res,
            })
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
            setMovies(doc.data()?.savedShows);
        })
    }, [user?.email]);

    return (
        <>
            <div className='relative flex items-center group pt-20'>
                <div className='w-full h-full relative flex flex-wrap items-center justify-center gap-2'>
                    {
                        movies.map((movie, id) => {
                            return (
                                <div key={id} className='w-[40%] md:w-[30%] cursor-pointer relative rounded overflow-hidden'>
                                    <img
                                        className='w-full h-auto block'
                                        src={`https://image.tmdb.org/t/p/original/${movie?.img}`} alt={movie?.title}
                                    />
                                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100'>
                                        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full'>{movie?.title}</p>
                                        <p onClick={() => deleteMovie(movie.id)} className='absolute top-4 left-4 hover:bg-slate-500'><AiOutlineClose /></p>
                                        <div className='flex justify-center items-center absolute bottom-5 left-0 right-0 w-full'>
                                            <button onClick={() => showMovieTrailer(movie)} className=' my-auto mx-auto bg-slate-400 rounded py-2 px-3 hover:bg-slate-600'>Play</button>
                                            <button onClick={() => showMovieInfo(movie)} className=' my-auto mx-auto bg-slate-400 rounded py-2 px-3 hover:bg-slate-600'>Info</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SavedShows