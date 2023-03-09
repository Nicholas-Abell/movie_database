import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import InfoOverlay from '../components/InfoOverlay';
import Row from '../components/Row';
import Found from '../components/Found'

const Search = () => {
    const [search, setSearch] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [genreId, setGenreId] = useState();
    const key = process.env.REACT_APP_MOVIE_DATABASE_API;
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&page=1&include_adult=false&query=${search}`;

    const onSearchChange = (event) => {
        event.target.value.length > 3
            ? setSearch(event.target.value)
            : console.log('not working');
    }

    const searchGenre = (genre, genreId) => {
        setSelectedGenre(genre);
        setGenreId(genreId);
    }

    return (
        <div className='pt-32'>
            <div className='px-4 mb-8'>
                <div className='flex justify-center items-center gap-4 bg-slate-700 rounded p-1'>
                    <AiOutlineSearch size={20} />
                    <input onChange={onSearchChange} type='text' placeholder='search for a movie or show' className='z-10 text-white w-full rounded bg-slate-600 py-1 px-4 focus:border-none' />
                </div>
            </div>
            <Row url={url} />
            <InfoOverlay />
            {!selectedGenre
                ? (<div className=' h-full mt-32'>
                    <h1 className='px-8 text-gray-400'>Search by Genre</h1>
                    <ul>
                        <li>
                            <div onClick={() => searchGenre('Action', 28)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Action</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Animation', 16)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Comedy</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Comedy', 35)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Comedy</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Crime', 80)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Crime</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Documentary', 99)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Documentaries</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Drama', 18)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Drama</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Fantasy', 14)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Fantasy</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Horror', 27)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Horror</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Romance', 10749)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Romance</h1>
                            </div>
                        </li>
                        <li>
                            <div onClick={() => searchGenre('Sci-Fi', 878)} className='border border-t-gray-400 p-8 hover:bg-slate-600 cursor-pointer'>
                                <h1 className='text-3xl'>Sci-Fi</h1>
                            </div>
                        </li>
                    </ul>
                </div>)
                : (
                    <Found url='' selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} genreId={genreId} />
                )}
        </div>
    )
}

export default Search