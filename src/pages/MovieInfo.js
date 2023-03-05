import { useNavigate } from 'react-router-dom';
import { SelectedMovie } from '../context/SelectedMovieContext';
import { ScreenSizeContext } from '../context/ScreenSizeContext';
import { useContext, useEffect, useState } from 'react';
import { SiHulu, SiNetflix, SiAmazonprime } from 'react-icons/si';
import axios from 'axios';
import { UserAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { doc, arrayUnion, updateDoc } from 'firebase/firestore';
import ButtonPalette from '../components/ButtonPalette';

const streamKey = process.env.REACT_APP_STREAMING_SEARCH_API;
const streamDomain = process.env.REACT_APP_STREAMING_AUTH_DOMAIN;

const MovieInfo = () => {
    const navigate = useNavigate();
    const { selectedMovie } = SelectedMovie();
    const isSmallScreen = useContext(ScreenSizeContext);
    const [streaming, setStreaming] = useState([]);

    const options = {
        method: 'GET',
        url: `https://where-can-i-watch1.p.rapidapi.com/search/us/${selectedMovie?.title}`,
        headers: {
            'X-RapidAPI-Key': streamKey,
            'X-RapidAPI-Host': streamDomain
        }
    };

    useEffect(() => {
        axios.request(options).then(function (response) {
            console.log(response.data[0]);
            setStreaming(response.data[0].options.stream)
        }).catch(function (error) {
            console.error(error);
        });
    }, []);

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
                            {/* <div className='my-4 flex '>
                                <button onClick={saveShow} className='text-gray-300 py-1 px-5 ml-4 bg-none flex justify-center items-center flex-col text-sm hover:text-slate-400'>{like ? <AiOutlineCheck /> : <AiOutlinePlus size={25} />}  My List</button>
                                <button onClick={() => navigate('/trailer')} className='rounded bg-gray-300 border-none w-[100px] h-[50px] text-black flex justify-center font-bold items-center text-xl mx-2 hover:bg-slate-400'><BsFillPlayFill size={30} />Play</button>
                            </div> */}
                            <p className='text-gray-400 text-sm'>Released: {selectedMovie?.release_date}</p>
                            <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200:'>{selectedMovie?.overview}</p>
                        </div>
                        <div className='mt-16 rounded-lg bg-black opacity-80'>
                            <h1 className='text-3xl md:text-5xl text-center border-b py-2 font-bold'>Where To Watch</h1>

                            {streaming.length > 0
                                ? <div className='w-full p-4 flex justify-center items-center gap-12'>
                                    {streaming?.map((stream) => stream.provider).includes('Netflix')
                                        ? <div className='cursor-pointer'><SiNetflix className='text-red-600' size={50} /> Netflix</div>
                                        : <div className='text-gray-500 opacity-80'><SiNetflix className='text-gray-500 opacity-80' size={50} /> Netflix</div>}
                                    {streaming?.map((stream) => stream.provider).includes('Hulu')
                                        ? <div><SiHulu className='text-green-500' size={100} /></div>
                                        : <div><SiHulu className='text-gray-500 opacity-80' size={100} /></div>}
                                    {streaming?.map((stream) => stream.provider).includes('Disney Plus')
                                        ? <div className='text-3xl text-blue-400'>Disney+</div>
                                        : <div className='text-3xl text-gray-500 opacity-80'>Disney+</div>}
                                </div>
                                : <div className='p-4'>...Checking</div>}
                            <div>
                                {
                                    streaming ?
                                        (
                                            streaming.map((stream) => {
                                                return (
                                                    <div>
                                                        <div>{stream.provider}</div>
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