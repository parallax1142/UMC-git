import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MovieCard from "./MovieCard";

const Hello = styled.h1`
    width: 100%;
    height: 350px;
    background-color: black;
    color: white;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SearchMovies = styled.div`
    min-height: 1000px;
    background-color: rgb(31, 33, 64);
    text-align: center;
    color: white;
    padding: 20px;
`;

const FindYourMovies = styled.div`
    font-size: 40px;
    margin-bottom: 50px;
`;

const SearchBox = styled.input`
    height: 40px;
    width: 500px;
    border-radius: 20px;
    padding: 0 20px;
    font-size: 16px;
`;

const ResultsContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    max-height: 600px;
    overflow-y: auto;
    margin-top: 50px;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;

const Home = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const API_KEY = '9239f40c762c0b55f8309be5ef2951cd';

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchTerm) {
                handleSearch();
            } else {
                setSearchResults([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    const handleSearch = async () => {
        const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${searchTerm}&page=1`
        );
        const data = await response.json();
        setSearchResults(data.results);
    };

    return (
        <div>
            <Hello>환영합니다</Hello>
            <SearchMovies>
                <FindYourMovies>Find your movies!</FindYourMovies>
                <SearchBox 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="영화 제목을 입력하세요"
                />
                {searchResults.length > 0 && (
                    <ResultsContainer>
                        {searchResults.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </ResultsContainer>
                )}
            </SearchMovies>
        </div>
    );
};

export default Home;