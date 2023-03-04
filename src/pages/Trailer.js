import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { YouTubePlayer } from 'react-video-players';
import { SelectedMovie } from '../context/SelectedMovieContext';

const Trailer = () => {
  const { selectedMovie } = SelectedMovie();
  const [ytId, setYTID] = useState('');
  const ytkey = process.env.REACT_APP_YOUTUBE_API;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedMovie?.title + 'movie trailer'}&maxResults=1&type=video&key=${ytkey}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setYTID((res.data.items[0].id.videoId.toString()));
      console.log((res.data.items[0].id.videoId.toString()));
    })
  }, []);


  return (
    <div className='py-20 border border-green-400'>
      {
        ytId
          ? (
            <YouTubePlayer height={'700px'} videoId={ytId} />
          ) : null
      }
    </div>
  )
}

export default Trailer;