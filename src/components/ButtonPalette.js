import React, { useContext, useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { SelectedMovie } from '../context/SelectedMovieContext';
import { OverLayContext } from '../App';

const ButtonPalette = ({ movie, setMovieBool = false, showInfoBool = true, showAddToListBool = true, size = 25 }) => {
    const navigate = useNavigate();
    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);

    const [like, setLike] = useState(false);
    const [saved, setSaved] = useState(false);
    const { setSelectedMovie } = SelectedMovie();
    const { setIsOverlayOpen } = useContext(OverLayContext);

    const showMovieInfo = (movie) => {
        const selectedMovie = setMovieBool ? setSelectedMovie(movie) : null;
        document.body.style.overflow = 'scroll';
        setIsOverlayOpen(false);
        navigate('/movieinfo');
    }

    const showMovieTrailer = (movie) => {
        const selectedMovie = setMovieBool ? setSelectedMovie(movie) : null;
        document.body.style.overflow = 'scroll';
        setIsOverlayOpen(false);
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
            {showAddToListBool ? <button onClick={saveShow} className='text-gray-300 py-1 px-5 ml-4 bg-none flex justify-center items-center flex-col text-sm hover:text-slate-400'>{like ? <AiOutlineCheck /> : <AiOutlinePlus size={size} />}  My List</button> : null}
            <button onClick={() => showMovieTrailer(movie)} className='rounded bg-gray-300 border-none w-[100px] h-[50px] text-black flex justify-center font-bold items-center text-xl mx-2 hover:bg-slate-400'><BsFillPlayFill size={size} />Play</button>
            {showInfoBool ?
                <button onClick={() => showMovieInfo(movie)} className='text-gray-300 py-1 px-5 ml-4 bg-none flex justify-center items-center flex-col hover:text-slate-400'><AiOutlineInfoCircle size={size} /> Info</button>
                : null}
        </div>
    )
}

export default ButtonPalette;
