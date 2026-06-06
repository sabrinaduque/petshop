import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #fff0f0 0%, #fd9803 100%);
  padding: 1rem;
  font-family: 'Nunito', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`;

export const FormContainer = styled.form`
  width: 100%;
  max-width: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #ffffff;
  color: #4a4a4a;
  padding: 3rem 2.5rem;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 2.6rem;
  margin-bottom: 0px;
  color: #ff7f50;
  text-align: center;
  font-weight: 800;

  @media (max-width: 1065px) {
    font-size: 1.8rem;
  }
`;

export const SubTitle = styled.p`
  width: 100%;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #888;
  font-size: 1.6rem;
  line-height: 1.2;
`;

export const Label = styled.p`
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 1.6rem;
  color: #888;

  font-family: ${({ theme }) => theme.fonts.inter};
`;

export const Input = styled.input`
  border: 2px solid #f0f0f0;
  background: #fafafa;
  border-radius: 12px;
  padding: 0 1.2rem;
  width: 100%;
  height: 4rem;
  font-size: 1.6rem;
  font-weight: 400;
  color: #333;
  outline: none;
  transition: all 0.3s ease;

  &:disabled {
    color: #aaa;
    background: #f0f0f0;
  }

  &::placeholder {
    color: #bbb;
    font-weight: 400;
  }

  &:focus-visible {
    border-color: #fc9604;
    background: #ffffff;
    box-shadow: 0 0 0 4px rgba(255, 127, 80, 0.1);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background: #ffa803;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 2.5rem 0 1rem 0;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 127, 80, 0.3);

  &:hover {
    background: #fd9302;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 127, 80, 0.4);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

export const ErrorMessage = styled.h3`
  width: 100%;
  margin-top: 8px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #ff4d4f;
`;

export const Logo = styled.img`
  width: 25rem;
  height: auto;
  margin-bottom: 1.5rem;
`;

export const RegisterText = styled.div`
  width: 100%;
  font-size: 1.6rem;
  font-weight: 400;
  color: #888;
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1.5rem;

  input[type='checkbox'] {
    height: 18px;
    width: 18px;
    accent-color: #ff7f50;
    cursor: pointer;
  }

  label {
    cursor: pointer;
    user-select: none;
  }
`;

export const CheckboxLabel = styled.label``;

export const Field = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  .icon {
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: #aaa;
    transition: color 0.2s ease;

    &:hover {
      color: #ff7f50;
    }
  }
`;
