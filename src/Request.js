const key = process.env.REACT_APP_MOVIE_DATABASE_API;

export const request = {
    requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}`,
    requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
    requestUpComing: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}`,
}

