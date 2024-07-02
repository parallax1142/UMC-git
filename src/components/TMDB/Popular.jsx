import React, { useState } from 'react';
import styled from 'styled-components';
import useFetchMovies from './useFetchMovies';
import Pagination from './Pagination';
import MovieCard from './MovieCard';

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
  background-color: rgb(31, 33, 64);
`;

function Popular() {
  const API_KEY = '9239f40c762c0b55f8309be5ef2951cd';
  const API_ENDPOINT = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR`;

  const [currentPage, setCurrentPage] = useState(1);
  const { movies, totalPages } = useFetchMovies(API_ENDPOINT, currentPage);

  return (
    <Container>
      <Container>
        {movies.length > 0 ? (
          movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        ) : (
          <p>영화를 불러오는 중...</p>
        )}
      </Container>
      <Container>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
    </Container>
  );
}

export default Popular;
