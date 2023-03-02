import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import { request } from '../Request';
import InfoOverlay from '../components/InfoOverlay';

const Home = ({ selectedMovie, setSelectedMovie }) => {

  const [isOverlayOpen, setIsOverlayOpen] = useState(true);

  useEffect(() => {
    console.log(selectedMovie);
  }, [selectedMovie])

  return (
    <div className='relative'>
      <Main setSelectedMovie={setSelectedMovie} />
      <Row title='Trending' url={request.requestPopular} rowId={1} setSelectedMovie={setSelectedMovie} />
      <Row title='Critic Acclaim' url={request.requestTopRated} rowId={2} setSelectedMovie={setSelectedMovie} />
      <Row title='Coming Soon' url={request.requestUpComing} rowId={3} setSelectedMovie={setSelectedMovie} />
      {/* <InfoOverlay selectedMovie={selectedMovie} isOverlayOpen={isOverlayOpen} setIsOverlayOpen={setIsOverlayOpen} /> */}
    </div>
  )
}

export default Home