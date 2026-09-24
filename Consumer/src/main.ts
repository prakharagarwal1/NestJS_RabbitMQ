import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module.js';

async function bootstrap() {
  // 1. Create a standard NestJS app (HTTP server)
  const app = await NestFactory.create(AppModule);

  // 2. Register the RabbitMQ microservice (consumes 'order-placed')
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_HOST || 'localhost'}:${
            process.env.RABBITMQ_PORT || 5672
          }`,
        ],
        queue: process.env.RABBITMQ_QUEUE || 'orders-queue',
        noAck: false,
        prefetchCount: 1,
      },
    },
  );

  // 3. Start listening to the queue
  await app.startAllMicroservices();

  // 4. Open an HTTP port (Consumer runs on 3001 by default)
  await app.listen(process.env.PORT ?? 3001);
}

await bootstrap();
