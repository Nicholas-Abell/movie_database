import React, { useContext, useEffect, useState, createContext } from 'react';
import { AppContext } from '../App';
import Main from '../components/Main';
import Row from '../components/Row';
import { request } from '../Request';
import InfoOverlay from '../components/InfoOverlay';

export const OverLayContext = createContext();

const Home = () => {
  const { selectedMovie, setSelectedMovie } = useContext(AppContext);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    console.log(selectedMovie);
  }, [selectedMovie])

  return (
    <OverLayContext.Provider value={{ isOverlayOpen, setIsOverlayOpen }}>
      <div className='relative'>
        <Main />
        <Row title='Trending' url={request.requestPopular} rowId={1} setSelectedMovie={setSelectedMovie} />
        <Row title='Critic Acclaim' url={request.requestTopRated} rowId={2} setSelectedMovie={setSelectedMovie} />
        <Row title='Coming Soon' url={request.requestUpComing} rowId={3} setSelectedMovie={setSelectedMovie} />
        <InfoOverlay />
      </div>
    </OverLayContext.Provider>
  )
}

export default Home