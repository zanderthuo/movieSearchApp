import React, { useState, useEffect } from 'react';

import Header from '../components/header/Header';
import Movie from '../components/movie/Movie';
import Search from '../components/search/Search';

import '../css/App.css';

const MOVIE_API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=f220860f";

const App = () => {
  //handle the loading state
  const [loading, setLoading] = useState(true);
  //handle the movies array  gotten from the server
  const [movies, setMovies] = useState([]);
  //handle any errors when making API request
  const [errorMessage, setErrorMessage] = useState(null);

  //perform side effects in your function components
  useEffect(() => {
    fetch(MOVIE_API_URL)
      .then(response => response.json())
      .then(jsonResponse => {
        setMovies(jsonResponse.Search);
        setLoading(false);
      });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=f220860f`)
      .then(response => response.json())
      .then(jsonResponse => {
        if(jsonResponse.Response === "True"){
          setMovies(jsonResponse.Search);
          setLoading(false);
        } else {
          setErrorMessage(jsonResponse.Error);
          setLoading(false);
        }
      });
  };

  return (
    <div className="App">
      <Header text="HOOKED" />
      <Search search={search} />
      <p className="App-intro">Sharing a few favorite movies</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading...</span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} />
          ))
        )}
      </div>
    </div>
  );

}

export default App;
