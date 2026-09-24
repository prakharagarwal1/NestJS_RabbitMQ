import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { OrderDto } from './dto/index.js';

@Controller()
export class OrdersConsumer {
  private readonly logger = new Logger(OrdersConsumer.name);

  @EventPattern('orders-placed')
  async handleOrderPlaced(
    @Payload() order: OrderDto,
    @Ctx() context: any,
  ) {
    const delayMs = 10000; // simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, delayMs));

    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    channel.ack(originalMsg);
    this.logger.log(`Received order after 10 Sec Delay: ${JSON.stringify(order)}`);
    return { status: 'ok' };
  }
}