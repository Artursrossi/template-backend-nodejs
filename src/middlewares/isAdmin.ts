import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify'
import jwt from 'jsonwebtoken'

import { prisma } from '@/libs/prisma'

declare module 'fastify' {
  export interface FastifyContextConfig {
    user?: {
      id: string
    }
  }
}

export const isAdmin = (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
  try {
    const authorization = request.headers['authorization']
    if (!authorization) return reply.status(401).send({ message: 'Not Authorized' })

    const authorizationValuesArr = authorization.split(' ')
    const token = authorizationValuesArr[1]
    if (authorizationValuesArr[0] !== 'Bearer' || !token) return reply.status(401).send({ message: 'Not Authorized' })

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JWT_USER
    if (!decoded) return reply.status(401).send({ message: 'Not Authorized' })

    prisma.users
      .findUnique({
        where: {
          id: decoded.id,
        },
        select: {
          role: true,
        },
      })
      .then((user) => {
        if (!user) return reply.status(401).send({ message: 'Not Authorized' })
        if (user.role !== 'ADMIN') return reply.status(403).send({ message: 'Not Authorized' })

        request.routeOptions.config.user = decoded
        done()
      })
      .catch(() => {
        return reply.status(401).send({ message: 'Not Authorized' })
      })
  } catch (err) {
    return reply.status(401).send({ message: 'Not Authorized' })
  }
}
