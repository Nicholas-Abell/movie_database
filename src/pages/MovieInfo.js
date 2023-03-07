import { SelectedMovie } from '../context/SelectedMovieContext';
import { ScreenSizeContext } from '../context/ScreenSizeContext';
import { useContext, useEffect, useState } from 'react';
import { SiHulu, SiNetflix, SiAmazonprime } from 'react-icons/si';
import axios from 'axios';
import ButtonPalette from '../components/ButtonPalette';

const tmdbKey = process.env.REACT_APP_MOVIE_DATABASE_API;

const MovieInfo = () => {
    const { selectedMovie } = SelectedMovie();
    const isSmallScreen = useContext(ScreenSizeContext);
    const [streaming, setStreaming] = useState([]);
    const [buyList, setBuyList] = useState([]);
    const [rentList, setRentList] = useState([]);

    const url = `https://api.themoviedb.org/3/movie/${selectedMovie?.id}/watch/providers?api_key=${tmdbKey}`

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

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
            <div className='relatvie z-10 w-full'>
                <div className='absolute z-10 w-full h-full bg-gradient-to-b from-black opacity-80'></div>
                <div className='absolute z-10 w-full h-full bg-gradient-to-t from-black opacity-95'></div>
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
                <div className='p-4 relative w-full z-20 pt-24'>
                    <div className='z-10'>
                        <h1 className='pt-4 text-3xl md:text-5xl'>{selectedMovie?.title}</h1>
                        <ButtonPalette movie={selectedMovie} showInfoBool={false} />
                        <p className='text-gray-400 text-sm'>Released: {selectedMovie?.release_date}</p>
                        <p className='w-full lg:max-w-[70%] text-gray-200:'>{selectedMovie?.overview}</p>
                    </div>
                    <div className='mt-24 rounded-lg bg-black opacity-80 border overflow-x-hidden'>
                        <h1 className='text-3xl md:text-5xl text-center border-b font-bold py-4'>Where To Watch</h1>
                        {streaming
                            ? <div className='w-full p-2 sm:p-5 flex justify-center items-center gap-4 sm:gap-6 md:gap-12'>
                                {streaming?.map((stream) => stream.provider_name).includes('Netflix')
                                    ? <div><SiNetflix className='text-red-600' size={50} /> Netflix</div>
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
                            <h1 className='text-3xl md:text-5xl text-center border-b font-bold py-4'>Provider</h1>
                            <div className='flex justify-between px-4 py-4'>
                                <div className='h-full flex flex-col'>
                                    <h1 className='font-bold text-xl border-b-2 mb-4'>Stream</h1>
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