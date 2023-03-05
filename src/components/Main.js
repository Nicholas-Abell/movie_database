import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { request } from '../Request';
import { ScreenSizeContext } from '../context/ScreenSizeContext';
import ButtonPalette from './ButtonPalette';

const Main = () => {
  const isSmallScreen = useContext(ScreenSizeContext);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    document.body.style.overflow = 'scroll';
    axios.get(request.requestPopular).then((res) => {
      setMovies(res.data.results);
      console.log(res.data.results);
    });
  }, []);

  useEffect(() => {
    if (movies.length > 0) {
      const random = Math.floor(Math.random() * movies.length);
      setMovie(movies[random]);
      console.log('movie: ' + movie);
    }
  }, [movies]);

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...'
    } else {
      return str;
    }
  }

  return (
    <div className='w-full h-[550px]'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
        <img
          className='w-full h-full object-cover'
          src={!isSmallScreen ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}` : `https://image.tmdb.org/t/p/original/${movie?.poster_path}`}
          alt={'movie_main'}
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl'>{movie?.title}</h1>
          <ButtonPalette movie={movie} setMovieBool={true} />
          <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200:'>{truncateString(movie?.overview, 250)}</p>
        </div>
      </div>
    </div>
  )
}

export default Main;