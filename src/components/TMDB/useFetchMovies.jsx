import { useState, useEffect } from 'react';

const useFetchMovies = (apiEndpoint, page) => {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${apiEndpoint}&page=${page}`);
        const data = await response.json();
        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      }
    };

    fetchMovies();
  }, [apiEndpoint, page]);

  return { movies, totalPages };
};

export default useFetchMovies;
