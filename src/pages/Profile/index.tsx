import React, { useCallback, useRef, ChangeEvent } from 'react';
import { FiMail, FiLock, FiUser, FiCamera, FiArrowLeft } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Avatar from '../../components/Avatar';

import { Container, Content, AvatarInput } from './styles';
import { useAuth, User } from '../../hooks/auth';

interface ProfileFormData {
  name: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(
    async (profileData: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Name is required'),
          email: Yup.string()
            .email('Enter a valid e-mail address')
            .required('E-mail is required'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Required field'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Required field'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), ''], 'Passwords does not match'),
        });

        await schema.validate(profileData, { abortEarly: false });

        const {
          password,
          password_confirmation,
          old_password,
          name,
          email,
        } = profileData;

        const formData = {
          name,
          email,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response: User = await api.put('api/profile', formData);
        updateUser(response);

        history.push('/dashboard');

        addToast({
          type: 'success',
          title: 'Profile updated!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }

        addToast({
          type: 'error',
          title: 'Update error',
          description:
            'An error has ocorreu while updating profile, please try again',
        });
      }
    },
    [addToast, history, updateUser],
  );

  const handleAvatarChange = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const data = new FormData();
        const { files } = e.target;
        data.append('avatar', files[0]);
        const response: User = await api.patch('api/users/avatar', data);
        updateUser(response);
        addToast({
          type: 'success',
          title: 'Avatar updated!',
        });
      }
    },
    [addToast, updateUser],
  );

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>

      <Content>
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <Avatar
              src={user.avatar_url}
              alt={user.name}
              width="186"
              height="186"
            />
            <label htmlFor="avatar">
              <FiCamera size={20} />
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleAvatarChange}
              />
            </label>
          </AvatarInput>

          <h1>Profile</h1>

          <Input icon={FiUser} name="name" type="text" placeholder="Name" />
          <Input icon={FiMail} name="email" type="email" placeholder="E-mail" />
          <Input
            type="password"
            icon={FiLock}
            name="old_password"
            containerStyle={{ marginTop: 24 }}
            placeholder="Current password"
          />
          <Input
            type="password"
            icon={FiLock}
            name="password"
            placeholder="New password"
          />
          <Input
            type="password"
            icon={FiLock}
            name="password_confirmation"
            placeholder="Confirm password"
          />

          <Button type="submit">Save changes</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default Profile;
