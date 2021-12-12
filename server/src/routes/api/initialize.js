import { insertSeeds } from '../../seeds';
import { sequelize } from '../../sequelize';

/**
 * @param {import('fastify').FastifyInstance} instance
 * @param {import('fastify').FastifyPluginOptions} options
 * @param {(err?: Error) => void} next
 * @returns {() => void}
 */
const router = (instance, options, next) => {
  instance.post('/initialize', async (_request, reply) => {
    await sequelize.sync({
      force: true,
      logging: false,
    });
    await insertSeeds();

    reply.status(200).type('application/json').send({});
  });

  next();
};

export { router as initializeRouter };
