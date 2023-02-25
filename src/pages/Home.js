import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import request from '../Request'

const Home = () => {
  return (
    <>
      <Main />
      <Row title='Trending' url={request.requestPopular} />
      <Row title='Critic Acclaim' url={request.requestTopRated} />
      <Row title='Coming Soon' url={request.requestUpComing} />
    </>
  )
}

export default Home