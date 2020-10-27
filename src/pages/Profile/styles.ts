import styled from 'styled-components';

export const Container = styled.div`
  height: 100vh;

  > header {
    height: 144px;
    background: var(--color-dark-100);
    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: var(--color-gray-600);
        width: 24px;
        height: 24px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: -76px auto 0;

  width: 100%;
  form {
    margin: 20px 0;
    width: 340px;
    text-align: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
      text-align: left;
    }

    a {
      color: var(--color-gray-200);
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: filter 0.2s ease;

      &:hover {
        filter: brightness(60%);
      }
    }
  }

  input[name='old_password'] {
    margin-top: 24px;
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: var(--color-primary);
    border-radius: 50%;
    bottom: 0;
    right: 0;
    border: 0;
    transition: filter 0.5s ease-out;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    &:hover {
      filter: brightness(40%);
    }
  }
`;
