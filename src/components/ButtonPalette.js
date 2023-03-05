import React, { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { SelectedMovie } from '../context/SelectedMovieContext';

const ButtonPalette = ({ movie, setMovieBool, showInfoBool }) => {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);

    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { setSelectedMovie } = SelectedMovie();

    const showMovieInfo = (movie) => {
        const selectedMovie = setMovieBool ? setSelectedMovie(movie) : null;
        navigate('/movieinfo');
    }

    const showMovieTrailer = (movie) => {
        const selectedMovie = setMovieBool ? setSelectedMovie(movie) : null;
        navigate('/trailer');
    }

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

    return (
        <div className='my-4 flex'>
            <button onClick={saveShow} className='text-gray-300 py-1 px-5 ml-4 bg-none flex justify-center items-center flex-col text-sm hover:text-slate-400'>{like ? <AiOutlineCheck /> : <AiOutlinePlus size={25} />}  My List</button>
            <button onClick={() => showMovieTrailer(movie)} className='rounded bg-gray-300 border-none w-[100px] h-[50px] text-black flex justify-center font-bold items-center text-xl mx-2 hover:bg-slate-400'><BsFillPlayFill size={30} />Play</button>
            {showInfoBool ?
                <button onClick={() => showMovieInfo(movie)} className='text-gray-300 py-1 px-5 ml-4 bg-none flex justify-center items-center flex-col hover:text-slate-400'><AiOutlineInfoCircle size={25} /> Info</button>
                : null}
        </div>
    )
}

export default ButtonPalette;
