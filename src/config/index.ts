import path from "path";
import dotenv from "dotenv";

const envPath = path.resolve(
  __dirname,
  `../.env.${process.env.NODE_ENV}`.concat(process.env.LOCAL ? ".local" : "")
);
console.log(envPath);
const values = dotenv.config({ path: envPath }).parsed as any;

const config = {
  HOST: values.HOST,
  PORT: values.PORT,
  JWT_SECRET: values.JWT_SECRET,
  POSTGRES_HOST: values.POSTGRES_HOST,
  POSTGRES_PORT: values.POSTGRES_PORT,
  POSTGRES_USERNAME: values.POSTGRES_USERNAME,
  POSTGRES_PASSWORD: values.POSTGRES_PASSWORD,
};

export default config;
