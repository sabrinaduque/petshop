import React from 'react';
import styled from 'styled-components';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  background?: string;
  border?: string;
  hover?: string;
  width?: string;
  height?: string;
}

export const StyledButton = styled.button<ButtonProps>`
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '4rem'};
  font-family: ${({ theme }) => theme.fonts.inter};
  font-weight: 500;
  font-size: 1.8rem;

  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;

  padding: 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border 0.2s;
  color: ${({ color }) => color || '#FEFEFD'};
  background: ${({ background }) => background || '#257180'};
  border: ${({ border }) =>
    border ? `1px solid ${border || '#257180'} ` : 'none'};

  &:hover {
    background: ${({ hover }) => hover || '#1e5a66'};
  }
`;
