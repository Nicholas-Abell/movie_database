import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { YouTubePlayer } from 'react-video-players';

const Trailer = ({ selectedMovie }) => {
  const [ytId, setYTID] = useState('');
  const ytkey = process.env.REACT_APP_YOUTUBE_API;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${selectedMovie?.title + 'movie trailer'}&type=video&key=${ytkey}`;

  useEffect(() => {
    axios.get(url).then((res) => {
      setYTID((res.data.items[0].id.videoId.toString()));
      console.log((res.data.items[0].id.videoId.toString()));
    })
  }, []);


  return (
    <div>
      {
        ytId 
        ? (<div className='h-screen w-full overflow-hidden' style={{border: 'solid red'}}><YouTubePlayer videoId={ytId}/></div> )
        : null
      }
    </div>
  )
}

export default Trailer;

// "items": [
//   {
//     "kind": "youtube#searchResult",
//     "etag": "OYwvb8e3-aOmDV0CXnoV8DdCId4",
//     "id": {
//       "kind": "youtube#video",
//       "videoId": "HSNE9tK98i0"   <---------
//     },