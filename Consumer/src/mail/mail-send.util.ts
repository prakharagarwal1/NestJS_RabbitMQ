import { Logger } from '@nestjs/common';
import { OrderDto } from '../orders/dto/index.js';

const logger = new Logger('MailSend');

/**
 * Simulates sending an email to the user.
 * Shared by both the legacy consumer and the new MailAckService
 * so the behaviour stays consistent across handlers.
 */
export async function simulateMailSend(order: OrderDto): Promise<boolean> {
  // Simulate network/SMTP latency
  await new Promise((resolve) => setTimeout(resolve, 10000));
  // Pretend the mail service succeeds when the email looks valid
  const success = Boolean(order.email && order.email.includes('@'));
  logger.log(
    `Mail ${success ? 'sent' : 'failed'} to user: ${order.email}`,
  );
  return success;
}