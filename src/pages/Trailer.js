import React from 'react';
import {YouTubePlayer} from 'react-video-players';

// useEffect(() => {
//     axios.get(ytrequest.requestSearch).then((res) => {
//       console.log(res);
//     })
//   }, []);

const Trailer = () => {
  return (
    <div>
      <YouTubePlayer />
    </div>
  )
}

export default Trailer