import { AiOutlineClose } from 'react-icons/ai';

import Row from './Row';


const Found = ({ selectedGenre, setSelectedGenre, genreId }) => {
    const key = process.env.REACT_APP_MOVIE_DATABASE_API;
    const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}`;
    const popular = `https://api.themoviedb.org/3/movie/popular?api_key=${key}&with_genres=${genreId}`;
    const topRated = `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&with_genres=${genreId}`
    const upComing = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&with_genres=${genreId}`;


    return (
        <>
            <div className='w-full relative mt-32'>
                <AiOutlineClose onClick={() => setSelectedGenre('')} className='text-white absolute left-4 top-2 hover:text-gray-500 cursor-pointer' />
                <h1 className='text-3xl font-bold text-center'>{selectedGenre}</h1>
                <Row title='Popular' url={popular} rowId={1} />
                <Row title='Top Rated' url={topRated} />
                <Row title='UpComing' url={upComing} />
            </div>
        </>
    )
}

export default Found