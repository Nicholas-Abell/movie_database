import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { AppContext } from '../App';
import { request } from '../Request';
import { useNavigate } from 'react-router-dom';
import { BsFillPlayFill } from 'react-icons/bs';
import { AiOutlineInfoCircle, AiOutlinePlus, AiOutlineCheck } from 'react-icons/ai';
import { UserAuth } from '../Context/AuthContext';
import { db } from '../firebase';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';

const Main = () => {
  const { setSelectedMovie } = useContext(AppContext);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const movieID = doc(db, 'users', `${user?.email}`);

  useEffect(() => {
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

  const saveShow = async () => {
    if (user?.email) {
      setLike(!like);
      setSaved(true);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: movie.id,
          title: movie.title,
          img: movie.backdrop_path,
          release_date: movie.release_date,
          overview: movie.overview
        })
      })
    } else {
      alert('Please Log in to save a movie');
    }
  }

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
          <div className='my-4 flex'>
            <button onClick={saveShow} className='text-gray-300 py-1 px-5 ml-4 bg-none flex justify-center items-center flex-col text-sm hover:text-slate-400'>{like ? <AiOutlineCheck /> : <AiOutlinePlus size={25} />}  My List</button>
            <button onClick={() => showMovieTrailer(movie)} className='rounded bg-gray-300 border-none w-[100px] h-[50px] text-black flex justify-center font-bold items-center text-xl mx-2 hover:bg-slate-400'><BsFillPlayFill size={30} />Play</button>
            <button onClick={() => showMovieInfo(movie)} className='text-gray-300 py-1 px-5 ml-4 bg-none flex justify-center items-center flex-col hover:text-slate-400'><AiOutlineInfoCircle size={25} /> Info</button>
          </div>
          <p className='text-gray-400 text-sm'>Released: {movie?.release_date}</p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200:'>{truncateString(movie?.overview, 250)}</p>
        </div>
      </div>
    </div>
  )
}

export default Main;