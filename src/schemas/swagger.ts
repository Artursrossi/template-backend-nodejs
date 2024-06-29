import { z } from 'zod'

export const headersSchema = z.object({
  authorization: z.string(),
})

export const defaultResponseSchema = {
  500: z.object({
    message: z.literal('Internal Server Error'),
  }),
  429: z.object({
    message: z.literal('Rate Limit Exceeded, try again later'),
  }),
}
