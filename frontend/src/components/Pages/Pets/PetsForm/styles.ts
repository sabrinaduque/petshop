import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 2.5rem;
  color: ${({ theme }) => theme.colors.gray700};
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  overflow-y: auto;

  form {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    justify-content: space-between;
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

export const FormGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  flex: 1;
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 6rem;

  @media (max-width: '768px') {
    grid-template-columns: 1fr;
  }
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const AccessSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 1rem;
`;

export const AccessTitle = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.black};
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 1rem;

  span {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.black};
    font-weight: 700;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm || '480px'}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(90vw, 420px);
  background: ${({ theme }) => theme.colors.white};
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    font-size: 1.8rem;
    color: ${({ theme }) => theme.colors.gray700};
    margin: 0;
  }

  p {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.gray400 || theme.colors.gray700};
    margin: 0;
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
`;
