import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js';
import { MailAckModule } from './mail/mail-ack.module.js';

@Module({
  imports: [RabbitmqModule, MailAckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
