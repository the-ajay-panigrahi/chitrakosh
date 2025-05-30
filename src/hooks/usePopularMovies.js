import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { API_OPTIONS, API_POPULAR_MOVIE_URL } from "../utils/constants";
import { addPopularMovies } from "../utils/store/movieSlice";

const usePopularMovies = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        fetchPopularMovies();
    }, []);

    const fetchPopularMovies = async () => {
        const data = await fetch(API_POPULAR_MOVIE_URL, API_OPTIONS);
        const jsonData = await data.json();
        dispatch(addPopularMovies(jsonData.results));
    };
}

export default usePopularMovies