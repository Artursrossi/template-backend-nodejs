import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { defaultResponseSchema } from '@/schemas/swagger'

export async function logout(request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie('template_auth')

  return reply.status(204).send()
}

export const logoutResponseSchema = {
  ...defaultResponseSchema,
  204: z.undefined(),
}
