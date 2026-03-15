import styled from 'styled-components';

export const MasterLayoutContainer = styled.div`
  width: 100%;
  height: 100vh;

  padding: 0;

  display: flex;
  align-items: stretch;
  flex-direction: column;

  background-color: ${({ theme }) => theme.colors.white};
`;

export const MasterLayoutContent = styled.div`
  width: 100%;
  overflow: auto;

  display: flex;
  flex-direction: column;
`;
