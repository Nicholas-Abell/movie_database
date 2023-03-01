const key = process.env.REACT_APP_MOVIE_DATABASE_API;
const ytkey = process.env.REACT_APP_YOUTUBE_API;
let search;

export const request = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
    requestUpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
}

export const ytrequest = {
    requestSearch: `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${search}&type=video&key=${ytkey}`
}

