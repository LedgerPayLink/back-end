export default () => ({
  database_url: process.env.DATABASE_URL,
  chain_mode: process.env.CHAIN_MODE,
  jwt: {
    at_secret: process.env.JWT_AT_SECRET,
    rt_secret: process.env.JWT_RT_SECRET,
  },
});
