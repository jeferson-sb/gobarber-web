import React from 'react';
import { render, wait, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../../components/Input';

jest.mock('@unform/core', () => {
  return {
    useField() {
      return {
        fieldName: 'email',
        defaultValue: '',
        error: '',
        registerField: jest.fn(),
      };
    },
  };
});

describe('Input component', () => {
  it('should be able to render an input', () => {
    render(<Input name="email" placeholder="E-mail" />);
    expect(screen.getByPlaceholderText('E-mail')).toBeTruthy;
  });

  it('should render highlight on input focus', async () => {
    render(<Input name="email" placeholder="E-mail" />);
    const inputElement = screen.getByPlaceholderText('E-mail');
    const containerElement = screen.getByTestId('input-container');

    inputElement.focus();

    await wait(() => {
      expect(containerElement).toHaveStyle('border-color: #ff9000');
      expect(containerElement).toHaveStyle('color: #ff9000');
    });

    inputElement.blur();

    await wait(() => {
      expect(containerElement).not.toHaveStyle('border-color: #ff9000');
      expect(containerElement).not.toHaveStyle('color: #ff9000');
    });
  });

  it('should keep input border highlighted when filled', async () => {
    render(<Input name="email" placeholder="E-mail" />);
    const inputElement = screen.getByPlaceholderText('E-mail');
    const containerElement = screen.getByTestId('input-container');

    fireEvent.change(inputElement, {target: { value: 'johndoe@example.com.br' },});

    fireEvent.blur(inputElement);

    await wait(() => {
      expect(containerElement).toHaveStyle('color: #ff9000');
    });
  });
});
