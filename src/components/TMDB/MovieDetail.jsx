import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const API_KEY = '9239f40c762c0b55f8309be5ef2951cd';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) return <Loading>Loading...</Loading>;
  if (error) return <Error>Error: {error.message}</Error>;

  return (
    <Container>
      {movie && (
        <Content>
          <Poster src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          <Details>
            <Title>{movie.title}</Title>
            <Rating>
              <span>평점</span>
              <Stars>
                {Array(Math.round(movie.vote_average)).fill().map((_, index) => (
                  <FaStar key={index} color="gold" />
                ))}
              </Stars>
            </Rating>
            <ReleaseDate>개봉일 {movie.release_date}</ReleaseDate>
            <Overview>줄거리</Overview>
            <Description>{movie.overview}</Description>
          </Details>
        </Content>
      )}
    </Container>
  );
};

export default MovieDetail;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #0c1735;
  color: white;
  min-height: 100vh;
`;

const Content = styled.div`
  display: flex;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const Poster = styled.img`
  width: 300px;
  object-fit: cover;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    margin-right: 10px;
  }
`;

const Stars = styled.div`
  display: flex;
`;

const ReleaseDate = styled.p`
  margin-bottom: 20px;
  font-size: 1.1em;
`;

const Overview = styled.h2`
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const Description = styled.p`
  font-size: 1.2em;
  line-height: 1.5;
`;

const Loading = styled.div`
  font-size: 2em;
  color: white;
`;

const Error = styled.div`
  font-size: 2em;
  color: red;
`;
