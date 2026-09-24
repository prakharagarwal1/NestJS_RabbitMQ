import { Module } from '@nestjs/common';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js';
import { OrdersModule } from './orders/orders.module.js';

@Module({
  imports: [RabbitmqModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
