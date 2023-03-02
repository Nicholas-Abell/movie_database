import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import { request } from '../Request'

const Home = ({ selectedMovie, setSelectedMovie }) => {
  return (
    <div>
      <Main setSelectedMovie={setSelectedMovie} />
      <Row title='Trending' url={request.requestPopular} rowId={1} setSelectedMovie={setSelectedMovie} />
      <Row title='Critic Acclaim' url={request.requestTopRated} rowId={2} setSelectedMovie={setSelectedMovie} />
      <Row title='Coming Soon' url={request.requestUpComing} rowId={3} setSelectedMovie={setSelectedMovie} />
    </div>
  )
}

export default Home