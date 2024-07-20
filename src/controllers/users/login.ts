import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '@/libs/prisma'
import { defaultResponseSchema } from '@/schemas/swagger'

export const loginBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(32),
})

export async function login(request: FastifyRequest, reply: FastifyReply) {
  const { email, password } = loginBodySchema.parse(request.body)

  const user = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
    },
  })
  if (!user) return reply.status(400).send({ message: 'Invalid Credentials' })

  const passwordsMatch = await bcrypt.compare(password, user.password)
  if (passwordsMatch === false) return reply.status(400).send({ message: 'Invalid Credentials' })

  const authorizationToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  reply.setCookie('template_auth', authorizationToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  const userToken = jwt.sign({ name: user.name, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '7d' })
  reply.setCookie('template_user', userToken, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  })

  return reply.status(200).send({ message: 'OK' })
}

export const loginResponseSchema = {
  ...defaultResponseSchema,
  400: z.object({
    message: z.enum(['Data Parse Error', 'Invalid Credentials']),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  }),
  200: z.object({
    message: z.literal('OK'),
  }),
}
