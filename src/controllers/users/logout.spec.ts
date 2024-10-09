import { FastifyReply, FastifyRequest } from 'fastify'
import { describe, expect, it, vi } from 'vitest'

import { logout } from './logout'

describe('logout-user (GET /logout)', () => {
  it('should return 204 and logout user', async () => {
    const reply = {
      status: vi.fn().mockReturnThis(),
      send: vi.fn(),
      clearCookie: vi.fn(),
    } as unknown as FastifyReply

    const request = {
      routeOptions: {
        config: {
          user: undefined,
        },
      },
    } as unknown as FastifyRequest

    await logout(request, reply)

    expect(reply.status).toHaveBeenCalledWith(204)
    expect(reply.clearCookie).toHaveBeenCalledWith('template_auth')
    expect(reply.clearCookie).toHaveBeenCalledTimes(1)
  })
})
