import styled from 'styled-components';

interface InputWrapperProps {
  $hasIcon?: boolean;
}

export const InputWrapper = styled.div<InputWrapperProps>`
  width: ${({ $hasIcon }) => ($hasIcon ? 'auto' : '100%')};
  position: relative;
`;

interface IconProps {
  $hasLabel?: boolean;
  $hasError?: boolean;
  $isSearch?: boolean;
}

export const Icon = styled.div<IconProps>`
  position: absolute;
  top: ${({ $hasLabel, $hasError }) =>
    $hasError && $hasLabel
      ? '60%'
      : $hasLabel
      ? '71%'
      : $hasError
      ? '34%'
      : '54%'};
  ${({ $isSearch }) => ($isSearch ? 'left: 10px;' : 'right: 10px;')}
  transform: translateY(-50%);
  color: #a2a2a2;
  pointer-events: none;

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const IconEye = styled.div<IconProps>`
  position: absolute;
  top: ${({ $hasLabel, $hasError }) =>
    $hasError && $hasLabel
      ? '60%'
      : $hasLabel
      ? '74%'
      : $hasError
      ? '34%'
      : '53%'};
  right: 1.6rem;
  transform: translateY(-50%);
  color: #a2a2a2;
  cursor: pointer;
  pointer-events: auto;

  &:hover {
    color: #b8b8b8ff;
  }

  svg {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

interface InputProps {
  $hasIcon: boolean;
  $isDisabled: boolean;
  $width?: string;
  $hasSearch?: boolean;
}

export const InputContent = styled.input<InputProps>`
  height: 4.3rem;
  width: ${({ $width }) => $width || '100%'};

  padding: ${({ $hasIcon, $hasSearch }) =>
    $hasSearch ? '0 1rem 0 3.5rem' : $hasIcon ? '0 4rem 0 2rem' : '0 2rem'};
  border-radius: 0.8rem;
  border: 1px solid #d1d0d0;
  background: #fefefd;

  color: ${({ $isDisabled }) => ($isDisabled ? '#454545' : '#000')};
  font-weight: 400;
  font-size: 1.8rem;
  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: #747373;
  }

  &:focus {
    outline: none;
  }

  &[type='number']::-webkit-outer-spin-button,
  &[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: #000;
    transition: background-color 5000s ease-in-out 0s;
    background: #fefefd;
  }
`;

interface LabelProps {
  $variant?: 'default' | 'bold';
}

export const Label = styled.div<LabelProps>`
  margin-bottom: ${({ $variant }) => ($variant === 'bold' ? '0.6rem' : '1rem')};
  font-weight: ${({ $variant }) => ($variant === 'bold' ? 700 : 400)};
  font-size: ${({ $variant }) => ($variant === 'bold' ? '1.6rem' : '1.8rem')};
  color: ${({ $variant }) => ($variant === 'bold' ? '#454545' : '#747373')};
`;
