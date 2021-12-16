import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class AppService {

  public constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  getHello(): string {
    return 'Hello World!';
  }
}
