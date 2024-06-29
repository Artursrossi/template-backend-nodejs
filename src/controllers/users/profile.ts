import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/libs/prisma'
import { defaultResponseSchema } from '@/schemas/swagger'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  const { user } = request.routeOptions.config
  if (!user) return reply.status(401).send({ message: 'Not Authorized' })

  const userData = await prisma.users.findUnique({
    where: {
      id: user.id,
    },
    select: {
      name: true,
      email: true,
    },
  })
  if (!userData) return reply.status(400).send({ message: 'User Not Found' })

  return reply.status(200).send(userData)
}

export const profileResponseSchema = {
  ...defaultResponseSchema,
  401: z.object({
    message: z.literal('Not Authorized'),
  }),
  400: z.object({
    message: z.literal('User Not Found'),
  }),
  200: z.object({
    email: z.string(),
    name: z.string(),
  }),
}
