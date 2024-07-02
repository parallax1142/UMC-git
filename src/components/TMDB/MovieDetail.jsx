import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';

const API_KEY = '9239f40c762c0b55f8309be5ef2951cd';
const NO_IMAGE_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz7ztleRwzXhFdiwBYqZ8cib9RvEsukVVUS3niN1YQ&s';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`);
        const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}`);
        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
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

  const renderCredits = (credits) => {
    return credits.map((person) => (
      <Person key={person.id}>
        <PersonImage src={person.profile_path ? `https://image.tmdb.org/t/p/w200${person.profile_path}` : NO_IMAGE_URL} alt={person.name} />
        <PersonName>{person.name}</PersonName>
        <PersonRole>{person.job || person.character}</PersonRole>
      </Person>
    ));
  };

  return (
    <Container>
      {movie && (
        <>
          <MovieInfoBlock>
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
          </MovieInfoBlock>
          <CreditsBlock>
            <Credits>
              <h2>출연진</h2>
              <CreditsGrid>
                {credits && renderCredits(credits.cast.slice(0, 6))}
              </CreditsGrid>
              <h2>감독진</h2>
              <CreditsGrid>
                {credits && renderCredits(credits.crew.filter((person) => person.job === 'Director'))}
              </CreditsGrid>
            </Credits>
          </CreditsBlock>
        </>
      )}
    </Container>
  );
};

export default MovieDetail;

// 스타일 컴포넌트 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: #0c1735;
  color: white;
  min-height: 100vh;
`;

const MovieInfoBlock = styled.div`
  display: flex;
  flex-direction: row;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-bottom: 20px;
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

const CreditsBlock = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 900px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
`;

const Credits = styled.div`
  h2 {
    font-size: 1.5em;
    margin-bottom: 10px;
  }
`;

const CreditsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 20px;
`;

const Person = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const PersonImage = styled.img`
  width: 150px;
  height: 225px;
  object-fit: cover;
  margin-bottom: 10px;
`;

const PersonName = styled.p`
  font-size: 1em;
  font-weight: bold;
`;

const PersonRole = styled.p`
  font-size: 0.9em;
  color: #aaa;
`;

const Loading = styled.div`
  font-size: 2em;
  color: white;
`;

const Error = styled.div`
  font-size: 2em;
  color: red;
`;
