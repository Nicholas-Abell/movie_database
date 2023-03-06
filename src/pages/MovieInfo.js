import { SelectedMovie } from '../context/SelectedMovieContext';
import { ScreenSizeContext } from '../context/ScreenSizeContext';
import { useContext, useEffect, useState } from 'react';
import { SiHulu, SiNetflix, SiAmazonprime } from 'react-icons/si';
import axios from 'axios';
import ButtonPalette from '../components/ButtonPalette';

const tmdbKey = process.env.REACT_APP_MOVIE_DATABASE_API;
const streamKey = process.env.REACT_APP_STREAMING_SEARCH_API;
const streamDomain = process.env.REACT_APP_STREAMING_AUTH_DOMAIN;

const MovieInfo = () => {
    const { selectedMovie } = SelectedMovie();
    const isSmallScreen = useContext(ScreenSizeContext);
    const [streaming, setStreaming] = useState([]);
    const [buyList, setBuyList] = useState([]);
    const [rentList, setRentList] = useState([]);

    const url = `https://api.themoviedb.org/3/movie/${selectedMovie?.id}/watch/providers?api_key=${tmdbKey}`


    const options = {
        method: 'GET',
        url: `https://where-can-i-watch1.p.rapidapi.com/search/us/${selectedMovie?.title}`,
        headers: {
            'X-RapidAPI-Key': streamKey,
            'X-RapidAPI-Host': streamDomain
        }
    };

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                console.log(res.data.results.US);
                setStreaming(res.data.results.US.flatrate);
                setRentList(res.data.results.US.rent);
                setBuyList(res.data.results.US.buy);
            })
            .catch(function (error) {
                console.error(error);
            });
    }, []);

    return (
        <>
            {/* <div className='w-full h-screen -z-10'>
                <div className='w-full h-full py-4 absolute'>
                    <div className='absolute w-full h-full bg-gradient-to-b from-black'></div>
                    <img
                        className='w-full h-full object-cover object-top'
                        src={
                            !isSmallScreen
                                ? selectedMovie?.backdrop_path !== undefined
                                    ? `https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`
                                    : `https://image.tmdb.org/t/p/original/${selectedMovie?.img}`
                                : selectedMovie?.poster_path !== undefined
                                    ? `https://image.tmdb.org/t/p/original/${selectedMovie?.poster_path}`
                                    : `https://image.tmdb.org/t/p/original/${selectedMovie?.img}`
                        }
                        alt={'movie_main'}
                    />
                </div>
            </div> */}
            <div className='relatvie z-10 w-full h-full'>
                <div className='absolute z-10 w-full h-full bg-gradient-to-b from-black opacity-80'></div>
                <img
                    className='absolute w-full h-full object-cover object-top'
                    src={
                        !isSmallScreen
                            ? selectedMovie?.backdrop_path !== undefined
                                ? `https://image.tmdb.org/t/p/original/${selectedMovie?.backdrop_path}`
                                : `https://image.tmdb.org/t/p/original/${selectedMovie?.img}`
                            : selectedMovie?.poster_path !== undefined
                                ? `https://image.tmdb.org/t/p/original/${selectedMovie?.poster_path}`
                                : `https://image.tmdb.org/t/p/original/${selectedMovie?.img}`
                    }
                    alt={'movie_main'}
                />
                <div className='px-4 relative w-full h-full z-20 pt-20'>
                    <div className='border z-10'>
                        <h1 className='pt-4 text-3xl md:text-5xl'>{selectedMovie?.title}</h1>
                        <ButtonPalette movie={selectedMovie} showInfoBool={false} />
                        <p className='text-gray-400 text-sm'>Released: {selectedMovie?.release_date}</p>
                        <p className='w-full lg:max-w-[70%] text-gray-200:'>{selectedMovie?.overview}</p>
                    </div>
                    <div className='h-[400px] overflow-scroll overflow-x-hidden mt-16 rounded-lg bg-black opacity-80 border'>
                        <h1 className='text-3xl md:text-5xl text-center border-b font-bold'>Where To Watch</h1>
                        {streaming
                            ? <div className='w-full p-2 flex justify-center items-center gap-12'>
                                {streaming?.map((stream) => stream.provider_name).includes('Netflix')
                                    ? <div className='cursor-pointer'><SiNetflix className='text-red-600' size={50} /> Netflix</div>
                                    : <div className='text-gray-500 opacity-80'><SiNetflix className='text-gray-500 opacity-80' size={50} /> Netflix</div>}
                                {streaming?.map((stream) => stream.provider_name).includes('Hulu')
                                    ? <div><SiHulu className='text-green-500' size={100} /></div>
                                    : <div><SiHulu className='text-gray-500 opacity-80' size={100} /></div>}
                                {streaming?.map((stream) => stream.provider_name).includes('Disney Plus')
                                    ? <div className='text-3xl text-blue-400'>Disney+</div>
                                    : <div className='text-3xl text-gray-500 opacity-80'>Disney+</div>}
                            </div>
                            : <div className='p-4'>...Could Not Find a Streaming Service for this Product</div>
                        }
                        <div className='flex flex-col p-2'>
                            <div className='flex justify-between px-4'>
                                <div className='h-full flex flex-col'>
                                    <h1 className='font-bold text-xl border-b-2'>Stream</h1>
                                    <ul className='text-sm md:text-base'>
                                        {
                                            streaming
                                                ?
                                                streaming?.map((stream, key) => {
                                                    return (
                                                        <li className='xs:py-1 py-0' key={key}>{stream.provider_name}</li>
                                                    )
                                                })
                                                : <div>none</div>
                                        }
                                    </ul>
                                </div>
                                <div className='h-full flex flex-col'>
                                    <h1 className='font-bold text-xl border-b-2'>Buy</h1>
                                    <ul >
                                        {
                                            buyList
                                                ?
                                                buyList?.map((buy, key) => {
                                                    return (
                                                        <li key={key}>{buy.provider_name}</li>
                                                    )
                                                })
                                                : <div>none</div>
                                        }
                                    </ul>
                                </div>
                                <div className='h-full flex flex-col'>
                                    <h1 className='font-bold text-xl border-b-2'>Rent</h1>
                                    <ul >
                                        {
                                            rentList
                                                ?
                                                rentList?.map((rent, key) => {
                                                    return (
                                                        <li key={key}>{rent.provider_name}</li>
                                                    )
                                                })
                                                : <div>none</div>
                                        }
                                    </ul>
                                </div>
                            </ div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieInfo;