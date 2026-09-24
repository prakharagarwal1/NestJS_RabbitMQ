import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrdersController } from './orders.controller.js';
import { Transport } from '@nestjs/microservices/enums/index.js';
import { ClientsModule } from '@nestjs/microservices/module/index.js';

@Module({
  imports: [   
       ClientsModule.register([
        {
          name: 'ORDERS_SERVICE',
          transport: Transport.RMQ,
          options: {
            urls: ['amqp://localhost:5672'],
            queue: 'orders-queue',
          },
        },
      ]),],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
