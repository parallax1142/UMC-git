import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  background-color: rgb(31, 33, 64);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  color: white;
`;

const SignupTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 10px;
`;

const Input = styled.input`
  padding: 8px;
  width: 100%;
  border-radius: 4px;
  border: 1px solid #ccc;
`;

const ErrorMessage = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  margin-top: 20px;
  background-color: ${props => props.disabled ? '#ccc' : '#007bff'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
`;

const LoginText = styled.strong`
  margin-top: 20px;
  cursor: pointer;
  color: #007bff;
  &:hover {
    text-decoration: underline;
  }
`;

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // 아이디 유효성 검사
    if (!formData.id.trim()) {
      newErrors.id = "아이디를 입력해주세요";
    }

    // 비밀번호 유효성 검사
    if (!formData.password) {
      newErrors.password = "비밀번호를 입력해주세요";
    } else if (formData.password.length < 4) {
      newErrors.password = "최소 4자리 이상 입력해야 합니다";
    } else if (formData.password.length > 12) {
      newErrors.password = "최대 12자리까지 입력가능 합니다";
    } else if (!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,12}$/.test(formData.password)) {
      newErrors.password = "영어, 숫자, 특수문자가 포함되어야 합니다";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    setIsFormValid(validateForm());
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log("Form submitted:", formData);
      alert("회원가입이 성공했습니다!");
      navigate('/'); // 홈페이지로 이동
    }
  };

  return (
    <Container>
      <SignupTitle>로그인</SignupTitle>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            name="id"
            placeholder="아이디를 입력해주세요"
            value={formData.id}
            onChange={handleChange}
          />
          {errors.id && <ErrorMessage>{errors.id}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Input
            type="password"
            name="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <ErrorMessage>{errors.password}</ErrorMessage>}
        </InputContainer>
        <SubmitButton type="submit" disabled={!isFormValid}>로그인</SubmitButton>
      </form>
    </Container>
  );
}

export default Login;
