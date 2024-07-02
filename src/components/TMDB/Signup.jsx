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

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // 이름 유효성 검사
    if (!formData.name.trim()) {
      newErrors.name = "이름을 입력해주세요";
    }

    // 이메일 유효성 검사
    if (!formData.email.trim()) {
      newErrors.email = "이메일을 입력해주세요";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "유효한 이메일 주소를 입력해주세요";
    }

    // 나이 유효성 검사
    if (!formData.age) {
      newErrors.age = "나이를 입력해주세요";
    } else {
      const ageNum = Number(formData.age);
      if (isNaN(ageNum)) {
        newErrors.age = "나이는 숫자여야 합니다";
      } else if (ageNum < 0) {
        newErrors.age = "나이는 양수여야 합니다";
      } else if (!Number.isInteger(ageNum)) {
        newErrors.age = "나이는 정수여야 합니다";
      } else if (ageNum < 19) {
        newErrors.age = "19세 이상만 가입 가능합니다";
      }
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

    // 비밀번호 확인 유효성 검사
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호를 다시 확인해주세요";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "비밀번호가 일치하지 않습니다";
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
      // 여기에 회원가입 로직을 구현하세요
      console.log("Form submitted:", formData);
      alert("회원가입이 성공했습니다!");
      navigate('/'); // 홈페이지로 이동
    }
  };

  return (
    <Container>
      <SignupTitle>회원가입</SignupTitle>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <Input
            type="text"
            name="name"
            placeholder="이름을 입력해주세요"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputContainer>
        <InputContainer>
          <Input
            type="number"
            name="age"
            placeholder="나이를 입력해주세요"
            value={formData.age}
            onChange={handleChange}
          />
          {errors.age && <ErrorMessage>{errors.age}</ErrorMessage>}
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
        <InputContainer>
          <Input
            type="password"
            name="confirmPassword"
            placeholder="비밀번호 확인"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <ErrorMessage>{errors.confirmPassword}</ErrorMessage>}
        </InputContainer>
        <SubmitButton type="submit" disabled={!isFormValid}>제출하기</SubmitButton>
      </form>
    </Container>
  );
}

export default Signup;