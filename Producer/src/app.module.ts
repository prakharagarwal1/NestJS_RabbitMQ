import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module.js';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module.js';

@Module({
  imports: [RabbitmqModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
