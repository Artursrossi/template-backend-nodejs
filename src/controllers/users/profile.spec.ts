import { FastifyReply, FastifyRequest } from 'fastify'
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'

import { prisma } from '@/libs/prisma'
import { user } from '@/mocks/user'
import { profile } from './profile'

vi.mock('@/libs/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
    },
  },
}))

describe('get-user-profile (GET /profile)', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return 401 not authorized', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      routeOptions: {
        config: {
          user: undefined,
        },
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock
    prismaMockFindUnique.mockResolvedValueOnce(user)

    await profile(request, reply)

    expect(reply.status).toHaveBeenCalledWith(401)
    expect(reply.send).toHaveBeenCalledWith({ message: 'Not Authorized' })
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(0)
  })

  it('should return 200 with user profile', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      routeOptions: {
        config: {
          user: {
            id: '1a1-2b2b-3c3c',
          },
        },
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock
    prismaMockFindUnique.mockResolvedValueOnce(user)

    await profile(request, reply)

    expect(reply.status).toHaveBeenCalledWith(200)
    expect(reply.send).toHaveBeenCalledWith({ user })
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(1)
  })
})
