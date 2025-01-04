import { FastifyReply, FastifyRequest } from 'fastify'
import { afterEach, describe, expect, it, Mock, vi } from 'vitest'
import bcrypt from 'bcrypt'

import { prisma } from '@/libs/prisma'
import { register } from './register'

vi.mock('@/libs/prisma', () => ({
  prisma: {
    users: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}))

vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn(),
  },
}))

describe('user-register (POST /register)', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should return 400 Passwords Do Not Match', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      body: {
        name: 'Artur Schincariol Rossi',
        email: 'artur@gmail.com',
        password: 'Teste123!@#',
        repeatPassword: 'Teste123',
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock

    const prismaMockCreate = prisma.users.create as Mock

    const bcryptMock = bcrypt.hash as Mock

    await register(request, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({ message: 'Passwords Do Not Match' })
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(0)
    expect(bcryptMock).toHaveBeenCalledTimes(0)
    expect(prismaMockCreate).toHaveBeenCalledTimes(0)
  })

  it('should return 400 Email Already Exists', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      body: {
        name: 'Artur Schincariol Rossi',
        email: 'artur@gmail.com',
        password: 'Teste123!@#',
        repeatPassword: 'Teste123!@#',
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock
    prismaMockFindUnique.mockResolvedValueOnce({ id: '1a1a-2b2b-3c3c' })

    const prismaMockCreate = prisma.users.create as Mock

    const bcryptMock = bcrypt.hash as Mock

    await register(request, reply)

    expect(reply.status).toHaveBeenCalledWith(400)
    expect(reply.send).toHaveBeenCalledWith({ message: 'Email Already Exists' })
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(1)
    expect(bcryptMock).toHaveBeenCalledTimes(0)
    expect(prismaMockCreate).toHaveBeenCalledTimes(0)
  })

  it('should return 201 CREATED', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      body: {
        name: 'Artur Schincariol Rossi',
        email: 'artur@gmail.com',
        password: 'Teste123!@#',
        repeatPassword: 'Teste123!@#',
      },
    } as unknown as FastifyRequest

    const prismaMockFindUnique = prisma.users.findUnique as Mock
    prismaMockFindUnique.mockResolvedValueOnce(null)

    const prismaMockCreate = prisma.users.create as Mock

    const bcryptMock = bcrypt.hash as Mock
    bcryptMock.mockResolvedValueOnce('1a1a-2b2b-3c3c')

    await register(request, reply)

    expect(reply.status).toHaveBeenCalledWith(201)
    expect(reply.send).toHaveBeenCalledWith({ message: 'CREATED' })
    expect(prismaMockFindUnique).toHaveBeenCalledTimes(1)
    expect(bcryptMock).toHaveBeenCalledTimes(1)
    expect(prismaMockCreate).toHaveBeenCalledTimes(1)
  })
})
