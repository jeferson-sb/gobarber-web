import React, { useRef, useCallback, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logo from '../../assets/logo.svg';
import { Container, Content, Background, AnimatedContainer } from './styles';

import { useToast } from '../../hooks/toast';
import api from '../../services/api';

interface ForgotPasswordData {
  email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: ForgotPasswordData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Enter a valid e-mail')
            .required('E-mail is required'),
        });

        await schema.validate(data, { abortEarly: false });

        await api.post('api/password/forgot', { email: data.email });

        addToast({
          type: 'success',
          title: 'Recovery e-mail sent!',
          description:
            "We'll send you an email to confirm your password, check your inbox",
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Recovery password error',
          description: 'An error has occurred while recovering your password',
        });
      } finally {
        setLoading(false);
      }
    },
    [addToast],
  );

  return (
    <Container>
      <Content>
        <AnimatedContainer>
          <img src={logo} alt="GoBarber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recover password</h1>

            <Input
              icon={FiMail}
              name="email"
              type="email"
              placeholder="E-mail"
            />

            <Button loading={loading} type="submit">
              Recover
            </Button>
          </Form>

          <Link to="/signin">
            <FiLogIn />
            Back to login
          </Link>
        </AnimatedContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
