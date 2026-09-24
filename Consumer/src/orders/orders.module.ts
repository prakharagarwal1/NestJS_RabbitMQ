import { Module } from '@nestjs/common';
import { OrdersConsumer } from './orders.consumer.js';

@Module({
  controllers: [OrdersConsumer],
})
export class OrdersModule {}