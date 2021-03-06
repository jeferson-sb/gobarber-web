import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import BackgroundImage from '../../components/BackgroundImage';

import logo from '../../assets/logo.svg';
import signInBackgroundImg from '../../assets/sign-in-background.webp';

import { Container, Content, AnimatedContainer } from './styles';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(() => !loading);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Enter a valid e-mail')
            .required('E-mail is required'),
          password: Yup.string().required('Password is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await signIn({
          email: data.email,
          password: data.password,
        });

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Authenticaton error',
          description:
            'An error has occurred while signing in, please check your credentials',
        });
      } finally {
        setLoading(() => !loading);
      }
    },
    [signIn, addToast, history, loading],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Sign In</h1>

            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
              data-testid="signin-email-input"
            />

            <Input
              icon={FiLock}
              name="password"
              type="password"
              placeholder="Password"
              data-testid="signin-password-input"
            />

            <Button type="submit" data-testid="signInBtn" loading={loading}>
              Sign In
            </Button>

            <Link to="/forgot-password">Forgot password</Link>
          </Form>

          <Link to="/signup">
            <FiLogIn />
            Create an account
          </Link>
        </AnimatedContainer>
      </Content>
      <BackgroundImage image={signInBackgroundImg} />
    </Container>
  );
};

export default SignIn;
