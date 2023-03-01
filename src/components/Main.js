import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { request } from '../Request';
import { useNavigate } from 'react-router-dom';

const Main = ({ setSelectedMovie }) => {
  const [movies, setMovies] = useState([]);
  const movie = movies[Math.floor(Math.random() * movies.length)];
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(request.requestPopular).then((res) => {
      setMovies(res.data.results);
      console.log(res.data.results);
    });
  }, []);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str;
    }
  }

  const showMovieInfo = (movie) => {
    setSelectedMovie(movie);
    navigate('/movieinfo');
  }

  const showMovieTrailer = (movie) => {
    setSelectedMovie(movie);
    navigate('/trailer');
  }

  return (
    <div className='w-full h-[550px]'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
        <img
          className='w-full h-full object-cover'
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={'movie_main'}
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl'>{movie?.title}</h1>
          <div className='my-4'>
            <button onClick={() => showMovieTrailer(movie)} className='border bg-gray-300 border-gray-300 py-2 px-5 text-black'>Play</button>
            <button onClick={() => showMovieInfo(movie)} className='border bg-gray-300 border-gray-300 py-2 px-5 ml-4 text-black '>Info</button>
          </div>
          <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200:'>{truncateString(movie?.overview, 250)}</p>
        </div>
      </div>
    </div>
  )
}

export default Main;