import React, { useReducer, useEffect } from 'react';

import Header from '../components/header/Header';
import Movie from '../components/movie/Movie';
import Search from '../components/search/Search';
import { initialState, reducer } from '../store/reducer/reducer';
import axios from "axios";

import spinner from "../assets/ajax-loader.gif";

import '../css/App.css';

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=f220860f";


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //handle the loading state
  // const [loading, setLoading] = useState(true);
  //handle the movies array  gotten from the server
  // const [movies, setMovies] = useState([]);
  //handle any errors when making API request
  // const [errorMessage, setErrorMessage] = useState(null);

  //perform side effects in your function components
  useEffect(() => {
    axios.get(MOVIE_API_URL).then(jsonResponse => {
        dispatch({
          type: "SEARCH_MOVIES_SUCCESS",
          payload: jsonResponse.Search
        });
        // setMovies(jsonResponse.Search);
        // setLoading(false);
      });
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const search = searchValue => {
    // setLoading(true);
    // setErrorMessage(null);
    dispatch({
      type: "SEARCH_MOVIES_REQUEST"
    });

    axios(`https://www.omdbapi.com/?s=${searchValue}&apikey=f220860f`).then(
      jsonResponse => {
        if(jsonResponse.Response === "True"){
          // setMovies(jsonResponse.Search);
          // setLoading(false);
          dispatch({
            TYPE: "SEARCH_MOVIE_SUCCESS",
            payload: jsonResponse.Search
          });
        } else {
          // setErrorMessage(jsonResponse.Error);
          // setLoading(false);
          dispatch({
            type: "SEARCH_MOVIES_FAILURE",
            error: jsonResponse.Error
          });
        }
      });
  };

  const { movies, errorMessage, loading } = state;

  const retrievedMovies =
    loading && !errorMessage ? (
      <img className="spinner" src={spinner} alt="Loading spinner" />
    ) : errorMessage ? (
      <div className="errorMessage">{errorMessage}</div>
    ) : (
      movies.map((movie, index) => (
        <Movie key={`${index}-${movie.Title}`} movie={movie} />
      ))
    );

  return (
    <div className="App">
      <div className="m-container">
        <Header text="HOOKED" />

        <Search search={search} />

        <p className="App-intro">Sharing a few of our favourite movies</p>

        <div className="movies">{retrievedMovies}</div>
      </div>
    </div>
  );

};

export default App;
