import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OrderDto } from '../orders/dto/index.js';
import { MailAckDto } from './dto/index.js';
import { simulateMailSend } from './mail-send.util.js';

@Injectable()
export class MailAckService {
  private readonly logger = new Logger(MailAckService.name);

  constructor(
    @Inject('MAIL_ACK_SERVICE') private readonly mailClient: ClientProxy,
  ) {}

  async processOrderAndAcknowledge(order: OrderDto): Promise<MailAckDto> {
    this.logger.log(`Processing order ${order.correlationId} for user ${order.email}`);

    // Simulate the mail being sent to the user
    const mailSent = await simulateMailSend(order);

    const ack: MailAckDto = {
      correlationId: order.correlationId!,
      email: order.email,
      productName: order.productName,
      quantity: order.quantity,
      sentAt: new Date().toISOString(),
      success: mailSent,
      message: mailSent
        ? `Mail successfully sent to ${order.email}`
        : `Mail failed to send to ${order.email}`,
    };

    // Emit the acknowledgment on a dedicated queue so the Producer can log it
    this.mailClient.emit('mail-ack', ack);

    this.logger.log(
      `Acknowledgment emitted for order ${order.correlationId}: success=${mailSent}`,
    );

    return ack;
  }

}