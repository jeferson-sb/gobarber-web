import { createGlobalStyle } from 'styled-components';

// color, state, variation (white-10, white-20)

export default createGlobalStyle`
  *, *::before, *::after{
    box-sizing: border-box;
  }

  :root {
    --color-white: #fff;
    --color-primary: #ff9000;
    --color-secondary: #312e38;
    --color-primary--hover: hsl(var(--color-primary), 100%, 44%);
    --color-gray-200: #f4ede8;

    --font-serif: 'Roboto Slab', serif;
    --font-sans: Helvetica, Arial, sans-serif;

    --shadow-sm: 0px 2px 4px rgba(37, 37, 37, 0.1);
  }

  html, body{
    background: var(--color-secondary);
    margin: 0;
    color: var(--color-white);
    -webkit-font-smoothing: antialiased;
  }
  body, input, button{
    font-family: var(--font-serif);
    font-size: 1rem;
  }

  h1, h2, h3, h4, h5, h6, strong{
    font-weight: 500;
  }

  button{
    cursor: pointer;
  }
`;
