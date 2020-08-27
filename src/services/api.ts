import ky from 'ky';

const api = ky.create({
  prefixUrl: process.env.REACT_APP_SERVER_URL,
});

export default api;
