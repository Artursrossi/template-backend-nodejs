import { FastifyReply, FastifyRequest } from 'fastify'
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { prisma } from '@/libs/prisma'
import { user } from '@/mocks/user'
import { login } from './login'

vi.mock('@/libs/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
    },
  },
}))

vi.mock('bcrypt', () => ({
  default: {
    compare: vi.fn(),
  },
}))

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
  },
}))

describe('user-login (POST /login)', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return 400 Invalid Credentials (email exception)', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      setCookie: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      body: {
        email: 'artur@gmail.com',
        password: 'Teste123!@#',
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock
    prismaMockFindUnique.mockResolvedValueOnce(null)

    const bcryptMock = bcrypt.compare as Mock

    const jwtSignMock = jwt.sign as Mock

    await login(request, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({ message: 'Invalid Credentials' })
    expect(reply.setCookie).toHaveBeenCalledTimes(0)
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(1)
    expect(bcryptMock).toHaveBeenCalledTimes(0)
    expect(jwtSignMock).toHaveBeenCalledTimes(0)
  })

  it('should return 400 Invalid Credentials (password exception)', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      setCookie: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      body: {
        email: 'artur@gmail.com',
        password: 'Teste123!@#',
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock
    prismaMockFindUnique.mockResolvedValueOnce(user)

    const bcryptMock = bcrypt.compare as Mock
    bcryptMock.mockResolvedValueOnce(false)

    const jwtSignMock = jwt.sign as Mock

    await login(request, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({ message: 'Invalid Credentials' })
    expect(reply.setCookie).toHaveBeenCalledTimes(0)
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(1)
    expect(bcryptMock).toHaveBeenCalledTimes(1)
    expect(jwtSignMock).toHaveBeenCalledTimes(0)
  })

  it('should return 200 OK', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      setCookie: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      body: {
        email: 'artur@gmail.com',
        password: 'Teste123!@#',
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock
    prismaMockFindUnique.mockResolvedValueOnce(user)

    const bcryptMock = bcrypt.compare as Mock
    bcryptMock.mockResolvedValueOnce(true)

    const jwtSignMock = jwt.sign as Mock
    jwtSignMock.mockResolvedValue('1a1a-2b2b-3c3c')

    await login(request, reply)

    expect(reply.status).toHaveBeenCalledWith(200)
    expect(reply.send).toHaveBeenCalledWith({ message: 'OK' })
    expect(reply.setCookie).toHaveBeenCalledTimes(2)
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(1)
    expect(bcryptMock).toHaveBeenCalledTimes(1)
    expect(jwtSignMock).toHaveBeenCalledTimes(2)
  })
})
