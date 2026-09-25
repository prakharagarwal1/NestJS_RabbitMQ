export class MailAckDto {
  constructor(
    public correlationId: string,
    public email: string,
    public productName: string,
    public quantity: number,
    public sentAt: string,
    public success: boolean,
    public message: string,
  ) {}
}