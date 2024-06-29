import { FastifyInstance } from 'fastify'

import { isUser } from '@/middlewares/isUser'
import { isAdmin } from '@/middlewares/isAdmin'
import { headersSchema } from '@/schemas/swagger'
import { register, registerBodySchema, registerResponseSchema } from './register'
import { login, loginBodySchema, loginResponseSchema } from './login'
import { logout, logoutResponseSchema } from './logout'
import { profile, profileResponseSchema } from './profile'
import { adminFindMany, adminFindManyResponseSchema } from './adminFindMany'

export async function usersController(app: FastifyInstance) {
  app.post(
    '/register',
    {
      schema: {
        tags: ['Users'],
        summary: 'Create User',
        body: registerBodySchema,
        response: registerResponseSchema,
      },
    },
    register,
  )
  app.post(
    '/login',
    {
      schema: {
        tags: ['Users'],
        summary: 'Authenticate User',
        body: loginBodySchema,
        response: loginResponseSchema,
      },
    },
    login,
  )
  app.get(
    '/logout',
    {
      schema: {
        tags: ['Users'],
        summary: 'Logout User',
        response: logoutResponseSchema,
      },
    },
    logout,
  )
  app.get(
    '/profile',
    {
      onRequest: [isUser],
      schema: {
        tags: ['Users'],
        summary: 'Get User',
        headers: headersSchema,
        response: profileResponseSchema,
      },
    },
    profile,
  )
  app.get(
    '/users',
    {
      onRequest: [isAdmin],
      schema: {
        tags: ['Users'],
        summary: 'Get All Users',
        headers: headersSchema,
        response: adminFindManyResponseSchema,
      },
    },
    adminFindMany,
  )
}
