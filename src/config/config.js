import dotenv from 'dotenv';
import { join } from 'path';
import Joi from 'joi';

dotenv.config();

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development').description('Environment'),
  PORT: Joi.number().default(8081),
  SECRET_KEY: Joi.string().required(),
  DB_PORT: Joi.number().required().description('Database port'),
  DB_HOST: Joi.string().required().description('Database host'),
  DB_USER: Joi.string().required().description('Database user'),
  DATABASE: Joi.string().required().description('Database name'),
  DB_PASSWORD: Joi.string().required().description('Database password')
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const port = envVars.PORT;
export const env = envVars.NODE_ENV;
export const secretKey = envVars.SECRET_KEY;
export const database = {
  host: envVars.DB_HOST,
  port: envVars.DB_PORT,
  database: envVars.DATABASE,
  user: envVars.DB_USER,
  password: envVars.DB_PASSWORD
};
