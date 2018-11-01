export default {
  baseUrl: '/api',
  port: 3000,
  mongoose: {
    hostname: '',
    dbname: '',
    username: '',
    password: '',
  },
  query: {
    limit: 100,
  },
  jwtSecret: '',
  jwtSession: {
    session: false,
  },
};