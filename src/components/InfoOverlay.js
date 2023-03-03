import React, { useContext, useState } from 'react';
import { AppContext } from '../App';
import { OverLayContext } from '../pages/Home';
import { AiFillCloseCircle } from 'react-icons/ai';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../Context/AuthContext';
import { db } from '../firebase';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';

const InfoOverlay = () => {
    const { selectedMovie } = useContext(AppContext);
    const { isOverlayOpen, setIsOverlayOpen } = useContext(OverLayContext);
    const [like, setLike] = useState(false);
    const { user } = UserAuth();
    const movieID = doc(db, 'users', `${user?.email}`);
    const [saved, setSaved] = useState(false);

    const navigate = useNavigate();

    const showInfo = () => {
        setIsOverlayOpen(false);
        navigate('/movieinfo');
    }

    const playTrailer = () => {
        setIsOverlayOpen(false);
        navigate('/trailer');
    }

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str;
        }
    }

    const saveShow = async () => {
        if (user?.email) {
            setLike(!like);
            setSaved(true);
            await updateDoc(movieID, {
                savedShows: arrayUnion({
                    id: selectedMovie.id,
                    title: selectedMovie.title,
                    img: selectedMovie.backdrop_path,
                    release_date: selectedMovie.release_date,
                    overview: selectedMovie.overview
                })
            })
        } else {
            alert('Please Log in to save a movie');
        }
    }

    const closeOverlay = () => {
        setIsOverlayOpen(false);
        document.body.style.overflow = 'scroll';

    }

    return (
        <div className='w-full h-[60vh] fixed z-50 bg-zinc-700 opacity-95 bottom-0 flex flex-col justify-between items-center p-6' style={{ borderRadius: '1rem 1rem 0 0', boxSizing: 'border-box', display: (isOverlayOpen ? 'block' : 'none') }}>
            <AiFillCloseCircle onClick={closeOverlay} size={40} className='absolute right-4 top-4 cursor-pointer hover:text-gray-300' />
            <div className='flex justify-center items-center gap-4 py-6'>
                <img
                    className='w-auto h-[240px] object-cover object-top'
                    src={selectedMovie?.backdrop_path !== undefined
                        ? `https://image.tmdb.org/t/p/original/${selectedMovie?.poster_path}`
                        : `https://image.tmdb.org/t/p/original/${selectedMovie?.img}`
                    }
                    alt={'movie_main'}
                />
                <div className='w-[80%] sm:w-[60%] h-[240px] flex flex-col text-lg'>
                    <div>
                        <h1 className='text-3xl'>{selectedMovie?.title}</h1>
                        <p className='text-sm'>Released: {selectedMovie?.release_date}</p>
                    </div>
                    <p className='my-5'>{truncateString(selectedMovie?.overview, 200)}</p>
                </div>
            </div>
            <div className='flex justify-around items-center my-8 gap-12 border-t-2 border-gray-400 py-2'>
                <div onClick={playTrailer} className='flex flex-col items-center justify-center cursor-pointer hover:text-gray-300'>
                    <BsFillPlayFill size={50} />
                    <p>Play</p>
                </div>
                <div onClick={showInfo} className='flex flex-col items-center justify-center cursor-pointer hover:text-gray-300'>
                    <AiOutlineInfoCircle size={50} />
                    <p>Info</p>
                </div>
                <div onClick={saveShow} className='flex flex-col items-center justify-center cursor-pointer hover:text-gray-300'>
                    {like ? <AiOutlinePlus size={50} /> : <AiOutlineCheck size={50} />}
                    <p>My List</p>
                </div>
            </div>
        </div>
    )
}

export default InfoOverlay;