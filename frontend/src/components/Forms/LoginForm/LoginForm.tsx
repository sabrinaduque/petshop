import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { ILoginForm, LoginSchema } from '@/validations/LoginSchema';
import { localStorageKeys } from '@/utils/localStorageKeys';
import { useAuth } from '@/hooks/useAuth';
import handleError, { getErrorMessage } from '@/utils/handleToast';

import { LoginResponse, User } from '@/interfaces/user.interface';
import api from '@/services/api';
import {
  Button,
  Container,
  FormContainer,
  Input,
  SubTitle,
  Title,
  Label,
  ErrorMessage,
  RegisterText,
  CheckboxLabel,
  Field,
  InputWrapper,
  Logo,
} from './styles';

const LoginForm = () => {
  const router = useRouter();
  const { setUser } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checked, setIsChecked] = useState(false);
  const [show, setShow] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>({
    resolver: yupResolver(LoginSchema),
    defaultValues:
      process.env.NODE_ENV === 'development'
        ? {
            email: 'admin@petshop.com',
            password: '123456',
          }
        : {
            email:
              typeof window !== 'undefined' &&
              localStorage.getItem('rememberMe') === 'true'
                ? localStorage.getItem('email') ?? ''
                : '',
          },
  });

  const onSubmit: SubmitHandler<ILoginForm> = async (form: ILoginForm) => {
    try {
      setIsSubmitting(true);

      const { data } = await api.post<LoginResponse>(
        '/auth/login',
        {
          email: form.email,
          password: form.password,
        },
        {
          skipAuthRefresh: true,
        } as any,
      );

      localStorage.setItem(localStorageKeys.accessToken, data.token);
      localStorage.setItem(localStorageKeys.user, JSON.stringify(data.user));

      setUser(JSON.parse(JSON.stringify(data.user)) as User);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <FormContainer onSubmit={handleSubmit(onSubmit)}>
        {/* <Title>Seja bem vindo!</Title> */}

        <Logo src="img/logo-pet.png" alt="Logo" />
        <SubTitle>Área de acesso ao sistema</SubTitle>

        <Label>E-mail</Label>
        <Input
          type="email"
          placeholder="Digite seu e-mail"
          {...register('email')}
        />
        {errors?.email?.message && (
          <ErrorMessage>{errors.email.message}</ErrorMessage>
        )}

        <Field>
          <Label>Senha</Label>
          <InputWrapper>
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Digite a senha"
              {...register('password')}
            />
            {show ? (
              <IoEyeOutline
                className="icon"
                size={22}
                onClick={() => setShow(false)}
              />
            ) : (
              <IoEyeOffOutline
                className="icon"
                size={22}
                onClick={() => setShow(true)}
              />
            )}
          </InputWrapper>
          {errors?.password?.message && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </Field>

        <RegisterText>
          <input
            type="checkbox"
            id="check"
            name="check"
            checked={checked}
            onClick={() => setIsChecked(!checked)}
          />
          <CheckboxLabel>Lembrar-me</CheckboxLabel>
        </RegisterText>

        <Button type="submit" disabled={isSubmitting}>
          Entrar
        </Button>
      </FormContainer>
    </Container>
  );
};

export default LoginForm;
