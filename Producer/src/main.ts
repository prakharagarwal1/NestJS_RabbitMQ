import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module.js';

async function bootstrap() {
  // 1. Create a standard NestJS app (HTTP server)
  const app = await NestFactory.create(AppModule);

  // 2. Register a RabbitMQ microservice to consume mail acknowledgments
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.RMQ,
      options: {
        urls: [
          `amqp://${process.env.RABBITMQ_HOST || 'localhost'}:${
            process.env.RABBITMQ_PORT || 5672
          }`,
        ],
        queue:
          process.env.RABBITMQ_MAIL_ACK_QUEUE || 'mail-ack-queue',
        noAck: false,
        prefetchCount: 1,
      },
    },
  );

  // 3. Start listening to the reply queue
  await app.startAllMicroservices();

  // 4. Open the HTTP port (Producer runs on 3000 by default)
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
