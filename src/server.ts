import Fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyCookie from '@fastify/cookie'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'
import { envSchema } from './config/env'
import { usersController } from './controllers/users/router'

const app = Fastify({
  logger: true,
  disableRequestLogging: true,
})

envSchema.parse(process.env)

await app.register(fastifyCors, {
  origin: process.env.APP_BASE_URL,
  credentials: true,
})
await app.register(fastifyHelmet)
await app.register(fastifyCookie)
await app.register(fastifyRateLimit, {
  global: true,
  max: 50,
  timeWindow: 1000 * 30, // 30 segundos
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)
app.setErrorHandler(errorHandler)

await app.register(fastifySwagger, {
  swagger: {
    consumes: ['application/json'],
    produces: ['application/json'],
    swagger: '2.0',
    info: {
      version: '1.0.0',
      title: 'API',
      contact: {
        name: 'Artur Schincariol Rossi',
        url: 'https://www.artursrossi.com.br/',
      },
    },
  },
  transform: jsonSchemaTransform,
})
await app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
  theme: {
    title: 'Artur Schincariol Rossi',
  },
})

/*  Index Route */
app.get('/', { schema: { hide: true } }, async (request, reply) => {
  return reply.status(200).send({ message: 'Template developed by Artur Schincariol Rossi' })
})

/* Controllers */
app.register(usersController)

try {
  await app.listen({
    host: '0.0.0.0',
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  })
} catch (error) {
  app.log.fatal(error)
  process.exit(1)
}
