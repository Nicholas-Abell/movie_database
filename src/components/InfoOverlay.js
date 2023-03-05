import React, { useContext } from 'react';
import { OverLayContext } from '../pages/Home';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SelectedMovie } from '../context/SelectedMovieContext';
import ButtonPalette from './ButtonPalette';

const InfoOverlay = () => {
    const { selectedMovie } = SelectedMovie();
    const { isOverlayOpen, setIsOverlayOpen } = useContext(OverLayContext);
    // const [like, setLike] = useState(false);

    const truncateString = (str, num) => {
        if (str?.length > num) {
            return str.slice(0, num) + '...'
        } else {
            return str;
        }
    }

    const closeOverlay = () => {
        // setLike(false);
        setIsOverlayOpen(false);
        document.body.style.overflow = 'scroll';
    }

    return (
        <div>
            {isOverlayOpen ? <div onClick={closeOverlay} className='w-full h-full z-40 fixed top-0' /> : null}
            <div className='w-full px-3 h-[60vh] fixed z-50 bg-zinc-700 opacity-95 bottom-0 flex flex-col justify-between items-center' style={{ borderRadius: '1rem 1rem 0 0', boxSizing: 'border-box', display: (isOverlayOpen ? 'block' : 'none') }}>
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
                            <h1 className='text-sm lg:text-3xl'>{selectedMovie?.title}</h1>
                            <p className='text-sm'>Released: {selectedMovie?.release_date}</p>
                        </div>
                        <p className='text-sm md:text-lg my-5'>{truncateString(selectedMovie?.overview, 200)}</p>
                    </div>
                </div>
                <ButtonPalette movie={selectedMovie} showInfoBool={true} setMovieBool={false} />
            </div>

        </div>
    )
}

export default InfoOverlay;