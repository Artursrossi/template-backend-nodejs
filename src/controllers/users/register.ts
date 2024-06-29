import { FastifyReply, FastifyRequest } from 'fastify'
import bcrypt from 'bcrypt'
import { z } from 'zod'

import { prisma } from '@/libs/prisma'
import { defaultResponseSchema } from '@/schemas/swagger'

export const registerBodySchema = z.object({
  name: z.string().max(255),
  email: z.string().email(),
  password: z
    .string()
    .min(6)
    .max(32)
    .regex(/^(?=.*[a-zA-Z])/, 'The password must have a letter')
    .regex(/^(?=.*\d)/, 'The password must have a number')
    .regex(/^(?=.*[@.#$!%*?&^])/, 'The password must have special character'),
  repeatPassword: z.string().min(6).max(32),
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const { name, email, password, repeatPassword } = registerBodySchema.parse(request.body)

  if (password !== repeatPassword) return reply.status(400).send({ message: 'Passwords Do Not Match' })

  const duplicatedEmail = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  })
  if (duplicatedEmail) return reply.status(400).send({ message: 'Email Already Exists' })

  const hash = await bcrypt.hash(password, 12)

  await prisma.users.create({
    data: {
      name,
      email,
      password: hash,
    },
  })

  return reply.status(201).send({ message: 'CREATED' })
}

export const registerResponseSchema = {
  ...defaultResponseSchema,
  400: z.object({
    message: z.enum(['Data Parse Error', 'Passwords Do Not Match', 'Email Already Exists']),
    errors: z.record(z.string(), z.array(z.string())).optional(),
  }),
  201: z.object({
    message: z.literal('CREATED'),
  }),
}
