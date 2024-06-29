import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { prisma } from '@/libs/prisma'
import { defaultResponseSchema } from '@/schemas/swagger'

export async function adminFindMany(request: FastifyRequest, reply: FastifyReply) {
  const { user } = request.routeOptions.config
  if (!user) return reply.status(401).send({ message: 'Not Authorized' })

  const users = await prisma.users.findMany({
    select: {
      name: true,
      email: true,
      role: true,
      updated_at: true,
      created_at: true,
    },
  })

  return reply.status(200).send({ users })
}

export const adminFindManyResponseSchema = {
  ...defaultResponseSchema,
  401: z.object({
    message: z.literal('Not Authorized'),
  }),
  403: z.object({
    message: z.literal('Not Authorized'),
  }),
  200: z.object({
    users: z.array(
      z.object({
        name: z.string(),
        email: z.string(),
        role: z.string(),
        updated_at: z.date(),
        created_at: z.date(),
      }),
    ),
  }),
}
