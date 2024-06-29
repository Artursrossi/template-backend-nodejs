import { z } from 'zod'

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  APP_BASE_URL: z.string(),
  PORT: z.string().default('3333'),
})
