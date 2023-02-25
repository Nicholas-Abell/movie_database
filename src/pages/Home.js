import React from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import request from '../Request'

const Home = () => {
  return (
    <>
      <Main />
      <Row title='Trending' url={request.requestPopular} rowId={1} />
      <Row title='Critic Acclaim' url={request.requestTopRated} rowId={2} />
      <Row title='Coming Soon' url={request.requestUpComing} rowId={3} />
    </>
  )
}

export default Home