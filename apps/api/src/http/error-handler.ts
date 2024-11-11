import { FastifyInstance } from 'fastify'
import { hasZodFastifySchemaValidationErrors } from 'fastify-type-provider-zod'

import { BadRequestError } from './routes/_errors/bad-request-error'
import { UnauthorizedError } from './routes/_errors/unauthorized-error'

type FastifyErrorInstance = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorInstance = (error, request, reply) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    reply.status(400).send({
      message: 'Validation error',
      errors: error.validation,
    })
  }

  if (error instanceof BadRequestError) {
    reply.status(400).send({
      errors: [{ message: error.message }],
    })
  }

  if (error instanceof UnauthorizedError) {
    reply.status(401).send({
      errors: [{ message: error.message }],
    })
  }

  console.error(error)
  reply.status(500).send({ message: 'Internal server error.' })
}
