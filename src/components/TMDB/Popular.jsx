import React from 'react';
import styled from 'styled-components';
import useFetchMovies from './useFetchMovies';
import MovieCard from './MovieCard';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  background-color : rgb(31, 33, 64);
`;

function Popular() {
  const API_KEY = '9239f40c762c0b55f8309be5ef2951cd';
  const API_ENDPOINT = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`;
  const movies = useFetchMovies(API_ENDPOINT);

  return (
    <Container>
      {movies.length > 0 ? (
        movies.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))
      ) : (
        <p>영화를 불러오는 중...</p>
      )}
    </Container>
  );
}

export default Popular;
