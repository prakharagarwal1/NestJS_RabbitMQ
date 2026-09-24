import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDERS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_HOST || 'localhost'}:${
              process.env.RABBITMQ_PORT || 5672
            }`,
          ],
          queue: process.env.RABBITMQ_QUEUE || 'orders-queue',
        },
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitmqModule {}