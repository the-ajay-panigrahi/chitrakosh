export const API_NOW_PLAYING_MOVIE_URL = "https://api.themoviedb.org/3/movie/now_playing?&page=1"
export const API_POPULAR_MOVIE_URL = "https://api.themoviedb.org/3/movie/popular?&page=1"
export const API_TOP_RATED_MOVIE_URL = "https://api.themoviedb.org/3/movie/top_rated?&page=1"
export const API_UPCOMING_MOVIE_URL = "https://api.themoviedb.org/3/movie/upcoming?&page=1"
export const API_OPTIONS = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer " + import.meta.env.VITE_TMDB_APIREADACCESSTOKEN,
    },
};

export const TMDB_IMG_URL = "https://image.tmdb.org/t/p/w500/"