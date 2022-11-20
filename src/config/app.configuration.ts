export const config = () => ({
  port: 3000,
  MONGO_CONNECTION_URI: process.env.MONGO_CONNECTION_URI,
  MONGO_TEST_CONNECTION_URI: process.env.MONGO_TEST_CONNECTION_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  ENV: process.env.ENV,
});
