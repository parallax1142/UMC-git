// useFetchMovies.js 파일
import { useState, useEffect } from 'react';

const useFetchMovies = (API_ENDPOINT) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [API_ENDPOINT]);

  return movies;
};

export default useFetchMovies;
