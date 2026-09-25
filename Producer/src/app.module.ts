import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module.js';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js';
import { MailAckModule } from './orders/mail-ack.module.js';

@Module({
  imports: [RabbitmqModule, OrdersModule, MailAckModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
