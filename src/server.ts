import cors from '@fastify/cors';
import dotenv from 'dotenv';
import Fastify from 'fastify';
import { routes } from './routes';

dotenv.config();

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
  reply.code(400).send({ message: error.message });
});

const start = async () => {
  app.register(cors);
  app.register(routes);

  try {
  await app.listen({
    port: Number(process.env.PORT) || 3333,
    host: '0.0.0.0',
  });

  console.log(
    `Server is running on port ${process.env.PORT || 3333}`
  );
} catch (err) {
  console.log(err);
}
};

start();
