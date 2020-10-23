import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  /* Remove default padding */
  ul[class],
  ol[class] {
    padding: 0;
  }

  :root {
    --color-white: #fff;
    --color-primary: #ff9000;
    --color-secondary: #312e38;
    --color-primary--hover: hsl(var(--color-primary), 100%, 44%);
    --color-gray-200: #f4ede8;
    --color-red-500: #c53030;

    --font-serif: 'Roboto Slab', serif;
    --font-sans: Helvetica, Arial, sans-serif;

    --shadow-sm: 0px 2px 4px rgba(37, 37, 37, 0.1);
  }

  html, body {
    margin: 0;
    scroll-behavior: smooth;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    background: var(--color-secondary);
    color: var(--color-white);
  }

  body, input, button {
    font-family: var(--font-serif);
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  /* Inherit fonts for inputs and buttons */
  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  button {
    cursor: pointer;
  }

  img {
    max-width: 100%;
    display: block;
  }
`;
