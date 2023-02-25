import axios from 'axios';
import Movie from './Movie';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import React, { useEffect, useState } from 'react';

const Row = ({ title, url }) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios(url).then((res) => {
            setMovies(res.data.results);
        })
    }, [url]);


    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 500;
    }

    return (
        <>
            <h2 className='font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <FaChevronLeft onClick={slideLeft} size={40} className='rounded-full text-black absolute opacity-50 hover:opacity-100 bg-white cursor-pointer z-10 hidden group-hover:block left-0' />
                <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {
                        movies.map((movie, id) => {
                            return (
                                <Movie key={id} movie={movie} />
                            )
                        })
                    }
                </div>
                <FaChevronRight onClick={slideRight} size={40} className='rounded-full text-black absolute opacity-50 hover:opacity-100 bg-white cursor-pointer z-10 hidden group-hover:block right-0' />
            </div>
        </>
    )
}

export default Row;