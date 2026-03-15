import { InputHTMLAttributes, useState, forwardRef } from 'react';
import { BsEnvelope } from 'react-icons/bs';
import { TfiLock } from 'react-icons/tfi';
import { FiSearch } from 'react-icons/fi';
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi';

import { Icon, IconEye, InputContent, InputWrapper, Label } from './styles';
import { ErrorMessage } from '../Forms/LoginForm/styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasIcon?: boolean;
  hasSearch?: boolean;
  icon?: React.ReactNode;
  maskFunction?: (value: string) => string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  labelVariant?: 'default' | 'bold';
  width?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      hasSearch,
      hasIcon,
      icon,
      width,
      maskFunction,
      onChange,
      label,
      labelVariant = 'default',
      error,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = rest.type === 'password';
    const isEmail = rest.type === 'email';

    const maskOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (maskFunction) {
        const masked = maskFunction(e.target.value);
        e.target.value = masked;
        if (onChange) {
          onChange(e);
        }
      }
    };

    return (
      <InputWrapper
        $hasIcon={((isEmail || isPassword) && !!hasIcon) || !!hasSearch}
      >
        {label && <Label $variant={labelVariant}>{label}</Label>}

        {/* Ícone de cadeado quando desabilitado e hasIcon */}
        {rest.disabled && hasIcon && (
          <Icon $hasLabel={!!label} $hasError={!!error}>
            <TfiLock size={20} color="#A2A2A2" />
          </Icon>
        )}

        {/* Ícones padrão */}
        {!rest.disabled && rest.type === 'email' && hasIcon && (
          <Icon $hasLabel={!!label} $hasError={!!error}>
            <BsEnvelope size={21} />
          </Icon>
        )}

        {!rest.disabled && rest.type === 'password' && hasIcon && (
          <Icon $hasLabel={!!label} $hasError={!!error}>
            <TfiLock size={20} color="#A2A2A2" />
          </Icon>
        )}

        {!rest.disabled && hasSearch && (
          <Icon $hasLabel={!!label} $hasError={!!error} $isSearch>
            <FiSearch size={20} color="#747373" />
          </Icon>
        )}

        {!rest.disabled && hasIcon && icon && (
          <Icon $hasLabel={!!label} $hasError={!!error}>
            {icon}
          </Icon>
        )}

        <InputContent
          {...rest}
          ref={ref}
          $width={width}
          type={showPassword ? 'text' : rest.type}
          $hasIcon={((isEmail || isPassword) && !!hasIcon) || !!hasSearch}
          $hasSearch={!!hasSearch}
          $isDisabled={!!rest.disabled}
          onChange={maskFunction ? maskOnChange : onChange}
          onWheel={
            rest.type === 'number'
              ? e => {
                  e.currentTarget.blur();
                }
              : undefined
          }
          aria-invalid={!!error}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}

        {rest.type === 'password' && (
          <IconEye
            $hasLabel={!!label}
            $hasError={!!error}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <HiOutlineEye size={24} className="icon-eye" />
            ) : (
              <HiOutlineEyeOff size={24} className="icon-eye" />
            )}
          </IconEye>
        )}
      </InputWrapper>
    );
  },
);

Input.displayName = 'Input';

export default Input;
