import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SignIn from '../../pages/SignIn';

const mockedHistoryPush = jest.fn();
const mockedSignIn = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({ push: mockedHistoryPush }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

jest.mock('../../hooks/auth', () => {
  return { useAuth: () => ({ signIn: mockedSignIn }) };
});

jest.mock('../../hooks/toast', () => {
  return { useToast: () => ({ addToast: mockedAddToast }) };
});

describe('SignIn Page', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign in', async () => {
    render(<SignIn />);

    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByTestId('signInBtn');
    userEvent.type(emailField, 'johndoe@gobarber.com');
    userEvent.type(passwordField, '123123');
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should not be able to sign in with invalid credentials', async () => {
    render(<SignIn />);

    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByTestId('signInBtn');
    userEvent.type(emailField, 'not-valid-email');
    userEvent.type(passwordField, '123123');
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedHistoryPush).not.toHaveBeenCalled();
    });
  });

  it('should display an error is login fails', async () => {
    mockedSignIn.mockImplementation(() => {
      throw new Error();
    });

    render(<SignIn />);

    const emailField = screen.getByPlaceholderText('E-mail');
    const passwordField = screen.getByPlaceholderText('Password');
    const buttonElement = screen.getByTestId('signInBtn');
    userEvent.type(emailField, 'johndoe@example.com');
    userEvent.type(passwordField, '123123');
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({ type: 'error' }),
      );
    });
  });
});
