import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
}));

export const authConfig = registerAs('auth', () => ({
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  jwtExpirationTime: process.env.JWT_EXPIRATION_TIME || '24h',
}));

export const databaseConfig = registerAs('database', () => ({
  url: process.env.DATABASE_URL || 'file:./dev.db',
}));