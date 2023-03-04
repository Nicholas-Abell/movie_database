import { useNavigate } from 'react-router-dom';
import { SelectedMovie } from '../context/SelectedMovieContext';

const MovieInfo = () => {
    const navigate = useNavigate();
    const { selectedMovie } = SelectedMovie();

    return (
        <>
            <div className='w-full h-screen overflow-hidden' style={{ WebkitOverflowScrolling: 'hidden' }}>
                <div className='w-full h-full'>
                    <div className='absolute w-full h-full bg-gradient-to-r from-black'></div>
                    <img
                        className='w-full h-full object-cover object-top'
                        src={selectedMovie?.backdrop_path !== undefined
                            ? `https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`
                            : `https://image.tmdb.org/t/p/original/${selectedMovie?.img}`
                        }
                        alt={'movie_main'}
                    />
                    <div className='absolute w-full top-[20%] p-4 md:p-8'>
                        <h1 className='text-3xl md:text-5xl'>{selectedMovie?.title}</h1>
                        <div className='my-4'>
                            <button onClick={() => navigate('/trailer')} className='border bg-gray-300 border-gray-300 py-2 px-5 text-black'>Play</button>
                            <button className='border bg-gray-300 border-gray-300 py-2 px-5 ml-4 text-black '>Watch Later</button>
                        </div>
                        <p className='text-gray-400 text-sm'>Released: {selectedMovie?.release_date}</p>
                        <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200:'>{selectedMovie?.overview}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieInfo