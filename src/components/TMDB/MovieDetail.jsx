import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { FaStar } from "react-icons/fa"
import axios from "axios";
import styled from "styled-components";

const API_KEY = '9239f40c762c0b55f8309be5ef2951cd';

function MovieDetail() {
  const { id } = useParams(); // URL에서 id 파라미터 추출
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`);
        if (!response.ok) {
          throw new Error('네트워크 응답이 실패했습니다');
        }
        const data = await response.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <Navigate to="/not-found" />;
  }

  if (!movie) {
    return <Navigate to="/not-found" />;
  }

  const { vote_average, overview, release_date, title: movieTitle, poster_path } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  const getOverview = (overview) => {
    return overview ? overview : 'TMDB에서 제공하는 API에 상세 정보가 없습니다';
  }

  const drawVoteAverage = (vote_average) => {
    const roundedVoteAverage = Math.round(vote_average * 2) / 2;
    const stars = [];
    const filledStars = Math.floor(vote_average)
    const emptyStars = 10 - filledStars

    for (let i = 0; i < filledStars; i++) {
      stars.push(<FaStar key={`filled-${i}`} color="gold" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaStar key={`filled-${i}`} color="lightgray" />);
    }

    return stars
  }

  const Detail = styled.div`
    display : inline-block
  `

  const Img = styled.img`
    transform : scale(0.7);
    margin-left : 50px;
  `

  return (
    <div>
      <Detail>
        <Img src={posterUrl} alt={movieTitle} />
      </ Detail>
      <Detail>
        <h2>{movieTitle}</h2>
        <p><strong>평점:</strong> {drawVoteAverage(vote_average)} ({vote_average.toFixed(1)})</p>
        <p><strong>개봉일:</strong> {release_date}</p>
        <p><strong>줄거리:</strong> {getOverview(overview)}</p>
      </ Detail>
    </div>
  );
}

export default MovieDetail;
