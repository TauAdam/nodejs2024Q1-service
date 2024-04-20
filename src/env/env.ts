import { z } from 'zod';

export const envSchema = z.object({
  PORT: z.coerce.number().positive().max(65535),
  CRYPT_SALT: z.coerce.number(),
  JWT_SECRET_KEY: z.string(),
  JWT_SECRET_REFRESH_KEY: z.string(),
  TOKEN_EXPIRE_TIME: z.string(),
  TOKEN_REFRESH_EXPIRE_TIME: z.string(),
  PG_HOST: z.string(),
  PG_DB: z.string(),
  PG_USER: z.string(),
  PG_PASSWORD: z.string(),
  PG_PORT: z.coerce.number(),
  DATABASE_URL: z.string().url(),
  TARGET: z.string(),
  TARGET_LOG_LEVEL: z.coerce.number(),
  MAX_LOG_FILE_SIZE: z.coerce.number(),
});

export type Env = z.infer<typeof envSchema>;
