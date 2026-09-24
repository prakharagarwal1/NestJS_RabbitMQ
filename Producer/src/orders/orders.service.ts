import { Inject, Injectable, Logger } from '@nestjs/common';
import { map } from 'rxjs';
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
    this.logger.log(`Placing order: ${JSON.stringify(order)}`);
    this.rabbitClient.emit('orders-placed', order);

    return { message: 'Order Placed!' };
  }
}


