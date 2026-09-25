import { Inject, Injectable, Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { OrderDto } from './dto/index.js';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger(OrdersService.name);

  constructor(
    @Inject('ORDERS_SERVICE')
    private rabbitClient: ClientProxy,
  ) {}

  placeOrder(order: OrderDto) {
    const correlationId = order.correlationId ?? randomUUID();
    const enriched: OrderDto = { ...order, correlationId };

    this.logger.log(`Placing order: ${JSON.stringify(enriched)}`);
    this.rabbitClient.emit('orders-placed', enriched);

    return { message: 'Order Placed!', correlationId };
  }
}


