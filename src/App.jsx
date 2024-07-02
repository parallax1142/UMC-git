import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Home from "./components/TMDB/Home";
import NowPlaying from "./components/TMDB/NowPlaying";
import Popular from "./components/TMDB/Popular";
import TopRated from "./components/TMDB/TopRated";
import UpComing from "./components/TMDB/UpComing";
import MovieDetail from "./components/TMDB/MovieDetail";
import Signup from "./components/TMDB/Signup";
import Login from "./components/TMDB/Login";
import NotFound from "./components/TMDB/NotFound"; // NotFound 컴포넌트 추가
import styled, { keyframes } from "styled-components";

const API_KEY = '9239f40c762c0b55f8309be5ef2951cd';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.2);
  border-left-color: #ffffff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: ${rotate} 1s infinite linear;
`;

function App() {
  const [isLoading, setIsLoading] = useState(false);

  const Nav = styled.nav`
    background-color: rgb(11, 10, 57);
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: 0;
  `;

  const NavItem = styled(Link)`
    color: white;
    text-decoration: none;
    margin: 0;
    padding-right: 20px;

    &:hover {
      transform: scale(1.1);
    }
  `;

  return (
    <div className="App">
      <Router>
        {isLoading && <LoadingSpinner />}
        <Nav>
          <div>
            <NavItem to="/Home">UMC Movie</NavItem>
          </div>
          <div>
            <NavItem to="/Login">로그인</NavItem>
            <NavItem to="/Signup">회원가입</NavItem>
            <NavItem to="/NowPlaying">NowPlaying</NavItem>
            <NavItem to="/Popular">Popular</NavItem>
            <NavItem to="/TopRated">TopRated</NavItem>
            <NavItem to="/UpComing">UpComing</NavItem>
          </div>
        </Nav>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/NowPlaying" element={<NowPlaying />} />
          <Route path="/Popular" element={<Popular />} />
          <Route path="/TopRated" element={<TopRated />} />
          <Route path="/UpComing" element={<UpComing />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/not-found" element={<NotFound />} /> {/* NotFound 경로 추가 */}
          <Route path="*" element={<NotFound />} /> {/* 모든 잘못된 경로 처리 */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
