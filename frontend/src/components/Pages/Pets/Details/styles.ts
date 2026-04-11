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
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 24px;
  padding: 2rem;

  p {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.inter};
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.gray700};
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 6rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 1.4rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray700};
`;

export const Value = styled.span`
  font-family: ${({ theme }) => theme.fonts.inter};
  font-size: 1.6rem;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.gray700};
`;
