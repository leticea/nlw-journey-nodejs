import { FastifyInstance } from "fastify";

type FastifyErrorHandler = FastifyInstance["errorHandler"];

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  console.log(error);

  return reply.status(500).send({ message: "Internal server error " });
};
