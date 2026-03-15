import React from 'react';
import { StyledButton } from './styles';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  hover?: string;
  background?: string;
  border?: string;
  width?: string;
  height?: string;
}

const Button = ({
  children,
  color,
  background,
  hover,
  border,
  width,
  height,
  ...rest
}: ButtonProps) => (
  <StyledButton
    color={color}
    background={background}
    border={border}
    hover={hover}
    width={width}
    height={height}
    {...rest}
  >
    {children}
  </StyledButton>
);

export default Button;
