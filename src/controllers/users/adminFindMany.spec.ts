import { FastifyReply, FastifyRequest } from 'fastify'
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'

import { prisma } from '@/libs/prisma'
import { users } from '@/mocks/user'
import { adminFindMany } from './adminFindMany'

vi.mock('@/libs/prisma', () => ({
  prisma: {
    users: {
      findMany: vi.fn(),
    },
  },
}))

describe('admin-find-many-users (GET /users)', () => {
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

    const prismaMockFindMany = prisma.users.findMany as Mock
    prismaMockFindMany.mockResolvedValueOnce(users)

    await adminFindMany(request, reply)

    expect(reply.status).toHaveBeenCalledWith(401)
    expect(reply.send).toHaveBeenCalledWith({ message: 'Not Authorized' })
    expect(prismaMockFindMany).toHaveBeenCalledTimes(0)
  })

  it('should return 200 with users', async () => {
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

    const prismaMockFindMany = prisma.users.findMany as Mock
    prismaMockFindMany.mockResolvedValueOnce(users)

    await adminFindMany(request, reply)

    expect(reply.status).toHaveBeenCalledWith(200)
    expect(reply.send).toHaveBeenCalledWith({ users })
    expect(prismaMockFindMany).toHaveBeenCalledTimes(1)
  })
})
