import React, { useState, createContext } from 'react';
import Main from '../components/Main';
import Row from '../components/Row';
import { request } from '../Request';
import InfoOverlay from '../components/InfoOverlay';


const Home = () => {

  return (
      <div>
        <Main />
        <Row title='Trending' url={request.requestPopular} rowId={1} />
        <Row title='Critic Acclaim' url={request.requestTopRated} rowId={2} />
        <Row title='Coming Soon' url={request.requestUpComing} rowId={3} />
        <Row title='Horror' url={request.requestHorror} rowId={4} />
        <Row title='Animated' url={request.requestAction} rowId={5} />
        <InfoOverlay />
      </div>
  )
}

export default Home