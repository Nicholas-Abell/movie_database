import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Row = ({ title, url }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios(url).then((res) => {
            setMovies(res.data.results);
        })
    }, [url]);

    console.log(movies);

    return (
        <>
            <h2 className='font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center'>
                <div id={'slider'}>
                    {
                        movies.map((movie, id) => {
                            return (
                                <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2'>
                                    <img
                                        className='w-full h-auto block'
                                        src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title}
                                    />
                                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100'>
                                        <p className='white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full'>{movie?.title}</p>
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

export default Row