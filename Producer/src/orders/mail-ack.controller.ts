import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload } from '@nestjs/microservices';
import { MailAckDto } from '../mail/dto/index.js';

@Controller()
export class MailAckController {
  private readonly logger = new Logger(MailAckController.name);
  private readonly messageDelayMs = 10_000;

  @EventPattern('mail-ack')
  async handleMailAck(@Payload() ack: MailAckDto, @Ctx() context: any) {
    const originalMsg = context.getMessage();
    const channel = context.getChannelRef();

    await new Promise((resolve) => setTimeout(resolve, this.messageDelayMs));
    channel.ack(originalMsg);

    if (ack.success) {
      this.logger.log(
        `Mail sent to user ${ack.email} for order ${ack.correlationId} ` +
          `(${ack.productName} x${ack.quantity}) at ${ack.sentAt}`,
      );
    } else {
      this.logger.warn(
        `Mail failed for user ${ack.email} on order ${ack.correlationId}: ${ack.message}`,
      );
    }

    return { status: 'ok' };
  }
}