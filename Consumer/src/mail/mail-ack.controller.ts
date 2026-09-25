import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { OrderDto } from '../orders/dto/index.js';
import { MailAckService } from './mail-ack.service.js';

@Controller()
export class MailAckController {
  private readonly logger = new Logger(MailAckController.name);
  private readonly messageDelayMs = 10_000;

  constructor(private readonly mailAckService: MailAckService) {}

  @EventPattern('orders-placed')
  async handleOrderPlaced(
    @Payload() order: OrderDto,
    @Ctx() context: any,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();

    try {
      await new Promise((resolve) => setTimeout(resolve, this.messageDelayMs));
      this.logger.log(`Received order: ${JSON.stringify(order)}`);
      await this.mailAckService.processOrderAndAcknowledge(order);
    } finally {
      channel.ack(originalMsg);
    }

    return { status: 'ok' };
  }
}