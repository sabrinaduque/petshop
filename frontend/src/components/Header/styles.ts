import styled from 'styled-components';

export const PageHeader = styled.header`
  min-height: 5.6875rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.primary};
  background: ${({ theme }) => theme.colors.primary};

  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 2rem;

  padding: 1.25rem 4rem 1.25rem 2.4rem;
  position: relative;

  @media (max-width: 968px) {
    padding: 1rem 1.5rem;
    gap: 1rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    min-height: 4.5rem;
  }
`;

export const HeaderBrand = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const HeaderLogo = styled.img`
  max-height: 42px;
  width: 118px;

  @media (max-width: 768px) {
    max-height: 36px;
    width: 100px;
  }
`;

export const HeaderTitle = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: 600;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
