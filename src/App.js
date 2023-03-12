import {React,useEffect, useState }from 'react';
import'./App.css';
import SearchIcon from './search.svg';
import MovieCard from './MovieCard';
// 77412896 
const API_URL = 'https://www.omdbapi.com/?i=tt3896198&apikey=77412896'

const App = () => {
  const [movies,setMovies] = useState([]);
  const[searchTerm,setSearchTerm] = useState();

  const searchMovies = async (title) =>{
    const response = await fetch (`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('Marvel');

  },[]);
  


  return (
    <div className="app">
      <h1>Gmovies</h1>
      <h2>Watch Movie Online</h2>

      <div className="search">
        <input
        
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies"
          onKeyDown= {event => {
            if(event.key === 'Enter'){
              setSearchTerm(event.target.value);
              searchMovies(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>

      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((item) => (
            <MovieCard movie={item} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>No movies found</h2>
        </div>
      )}
    </div>
  );
};

export default App;