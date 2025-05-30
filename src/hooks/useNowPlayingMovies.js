import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_NOW_PLAYING_MOVIE_URL, API_OPTIONS, } from "../utils/constants";
import { addNowPlayingMovies } from "../utils/store/movieSlice";

const useNowPlayingMovies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        fetchNowPlayingMovies();
    }, []);

    const fetchNowPlayingMovies = async () => {
        const data = await fetch(API_NOW_PLAYING_MOVIE_URL, API_OPTIONS);
        const jsonData = await data.json();
        dispatch(addNowPlayingMovies(jsonData.results));
    };
}

export default useNowPlayingMovies