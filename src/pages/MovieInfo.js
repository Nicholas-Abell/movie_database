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
    const [backupStream, setBackupStream] = useState([]);

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
        axios.request(options)
            .then(function (response) {
                console.log(response.data[0]);
                setStreaming(response.data[0].options.stream)
            })
            .catch(function (error) {
                console.error(error);
                axios.get(url)
                    .then((res) => {
                        console.log(res.data.results.US.flatrate[0].provider_name);
                        setBackupStream(res.data.results.US.flatrate);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
            });
    }, []);

    useEffect(() => {
        console.log('back up stream:' + backupStream);
    }, [backupStream])

    // title:"Back to the Future"
    // year:"1985"
    // country:"us"
    //  options:stream:
    //      0:
    //      provider:"Peacock Premium"
    //      option:"Stream"
    //      pricing:"Subs HD "
    //      providerUrl:"https://www.peacocktv.com/watch/asset/movies/adventure/back-to-the-future/2a2c1229-2a42-3a10-bd50-2596e64e96d1"
    //      1:
    //      provider:"DIRECTV"
    //      option:"Stream"
    //      pricing:"Subs HD "
    //      providerUrl:"https://www.directv.com/movies/Back-to-the-Future-RTB4bU5Xb2I3Y3NpL3Rwb1JpMmJydz09"
    //      2:
    //      provider:"USA Network"
    //      option:"Stream"
    //      pricing:"Subs "
    //      providerUrl:"https://www.usanetwork.com/back-to-the-future/video/back-to-the-future/4230005"

    return (
        <>
            <div className='w-full h-screen overflow-hidden' style={{ WebkitOverflowScrolling: 'hidden' }}>
                <div className='w-full h-full'>
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
                    <div className='absolute w-full top-[20%] p-4 md:p-8'>
                        <div>
                            <h1 className='text-3xl md:text-5xl'>{selectedMovie?.title}</h1>
                            <ButtonPalette movie={selectedMovie} showInfoBool={false} />
                            <p className='text-gray-400 text-sm'>Released: {selectedMovie?.release_date}</p>
                            <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200:'>{selectedMovie?.overview}</p>
                        </div>
                        <div className='mt-16 rounded-lg bg-black opacity-80'>
                            <h1 className='text-3xl md:text-5xl text-center border-b py-2 font-bold'>Where To Watch</h1>

                            {streaming.length > 0 || backupStream.length > 0
                                ? <div className='w-full p-4 flex justify-center items-center gap-12'>
                                    {streaming?.map((stream) => stream.provider).includes('Netflix')
                                        || backupStream?.map((stream) => stream.provider_name).includes('Netflix')
                                        ? <div className='cursor-pointer'><SiNetflix className='text-red-600' size={50} /> Netflix</div>
                                        : <div className='text-gray-500 opacity-80'><SiNetflix className='text-gray-500 opacity-80' size={50} /> Netflix</div>}
                                    {streaming?.map((stream) => stream.provider).includes('Hulu')
                                        || backupStream?.map((stream) => stream.provider_name).includes('Hulu')
                                        ? <div><SiHulu className='text-green-500' size={100} /></div>
                                        : <div><SiHulu className='text-gray-500 opacity-80' size={100} /></div>}
                                    {streaming?.map((stream) => stream.provider).includes('Disney Plus')
                                        || backupStream?.map((stream) => stream.provider_name).includes('Disney Plus')
                                        ? <div className='text-3xl text-blue-400'>Disney+</div>
                                        : <div className='text-3xl text-gray-500 opacity-80'>Disney+</div>}
                                </div>
                                : <div className='p-4'>...Could Not Find a Streaming Service for this Product</div>
                            }
                            <div className='border border-red-400 flex flex-col'>
                                <h1>Providers:</h1>
                                {
                                    //Chatgpt why does this return null
                                    streaming?.length > 0 ?
                                        (
                                            streaming?.map((stream, key) => {
                                                return (
                                                    <div key={key}>
                                                        <div>{stream?.provider} test</div>
                                                    </div>
                                                )
                                            })
                                        )
                                        : backupStream && backupStream.length > 0 ?
                                            (
                                                backupStream.map((stream, key) => {
                                                    return (
                                                        <div key={key}>
                                                            <div>{stream?.provider_name} test</div>
                                                        </div>
                                                    )
                                                })
                                            )
                                            : null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieInfo;