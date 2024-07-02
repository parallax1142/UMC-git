// This file does not require any changes related to styles
import React, { useState, useEffect } from 'react';

const API_KEY = '9239f40c762c0b55f8309be5ef2951cd'; 

function useFetchMovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1`;
        fetch(url)
            .then(response => response.json())
            .then(data => setMovies(data.results))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return movies;
}

export default useFetchMovies;