import { Module } from '@nestjs/common';
import { MailAckController } from './mail-ack.controller.js';

@Module({
  controllers: [MailAckController],
})
export class MailAckModule {}