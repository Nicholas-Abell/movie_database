import React, { useEffect } from 'react';
import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';


const Found = ({ selectedGenre, setSelectedGenre, genreId }) => {
    const key = process.env.REACT_APP_MOVIE_DATABASE_API;
    const genreUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=${genreId}`;

    useEffect(() => {
        axios(genreUrl).then((res) => {
            // setMovies(res.data.results.filter(m => m.backdrop_path));
            console.log(res.data.results);
        })
    }, [genreUrl]);

    return (
        <>
            <div className='border w-full relative'>
                <AiOutlineClose onClick={() => setSelectedGenre('')} className='text-white absolute left-4 top-2 hover:text-gray-500 cursor-pointer' />
                <h1 className='text-3xl font-bold text-center'>{selectedGenre}</h1>
                <div>

                </div>
            </div>
        </>
    )
}

export default Found