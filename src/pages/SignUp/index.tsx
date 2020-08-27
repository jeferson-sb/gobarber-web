import React, { useCallback, useRef } from 'react';
import {
  FiMail, FiLock, FiUser, FiArrowLeft,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';

import {
  Container, Content, Background, AnimatedContainer,
} from './styles';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Enter a valid e-mail')
            .required('E-mail is required'),
          password: Yup.string().min(6, 'At least 6 characters'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('api/users', { json: { ...data } });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Account registered!',
          description: 'You already can login into GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Registration error',
          description: 'An error has occurred while registering',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimatedContainer>
          <img src={logo} alt="GoBarber" />

          <Form onSubmit={handleSubmit} ref={formRef}>
            <h1>Create an account</h1>

            <Input icon={FiUser} name="name" type="text" placeholder="Name" />
            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
            />
            <Input
              type="password"
              icon={FiLock}
              name="password"
              placeholder="Password"
            />

            <Button type="submit">Sign Up</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Go back
          </Link>
        </AnimatedContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
