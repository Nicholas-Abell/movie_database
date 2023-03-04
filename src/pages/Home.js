import React, { useContext, useEffect, useState, createContext } from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import { request } from '../Request';
import InfoOverlay from '../components/InfoOverlay';
import { SelectedMovie } from '../context/SelectedMovieContext';

export const OverLayContext = createContext();

const Home = () => {
  const { selectedMovie, setSelectedMovie } = SelectedMovie();
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  useEffect(() => {
    console.log(selectedMovie);
  }, [selectedMovie])

  return (
    <OverLayContext.Provider value={{ isOverlayOpen, setIsOverlayOpen }}>
      <div className='relative'>
        <Main />
        <Row title='Trending' url={request.requestPopular} rowId={1} />
        <Row title='Critic Acclaim' url={request.requestTopRated} rowId={2} />
        <Row title='Coming Soon' url={request.requestUpComing} rowId={3} />
        <InfoOverlay />
      </div>
    </OverLayContext.Provider>
  )
}

export default Home