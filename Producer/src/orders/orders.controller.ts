import { Controller, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service.js';
import { OrderDto } from './dto/index.js';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('place-order')
  placeOrder(@Body() order: OrderDto) {
    return this.ordersService.placeOrder(order);
  }
}
