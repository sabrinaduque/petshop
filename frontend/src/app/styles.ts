import styled from 'styled-components';

export const Main = styled.main`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.secondary[40]};
`;
