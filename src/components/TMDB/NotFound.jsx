import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {

    const navigate = useNavigate();

    const goHome = () => {
        navigate('/Home');
    };

    return (
        <div>
            <h1>404 - 페이지를 찾을 수 없습니다</h1>
            <p>요청하신 페이지를 찾을 수 없습니다.</p>
            <button onClick={goHome}>Home으로 이동</button>
        </div>
    );
};

export default NotFound;
