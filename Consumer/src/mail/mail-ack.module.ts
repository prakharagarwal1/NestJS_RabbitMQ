import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MailAckController } from './mail-ack.controller.js';
import { MailAckService } from './mail-ack.service.js';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MAIL_ACK_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            `amqp://${process.env.RABBITMQ_HOST || 'localhost'}:${
              process.env.RABBITMQ_PORT || 5672
            }`,
          ],
          queue: process.env.RABBITMQ_MAIL_ACK_QUEUE || 'mail-ack-queue',
          persistent: true,
        },
      },
    ]),
  ],
  controllers: [MailAckController],
  providers: [MailAckService],
  exports: [MailAckService, ClientsModule],
})
export class MailAckModule {}