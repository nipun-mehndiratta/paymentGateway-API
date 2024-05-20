import { Controller, Get } from '@nestjs/common';
import { MobileService } from '../mobile.service';

@Controller('mobile')
export class MobileController {
  constructor(private readonly mobileService: MobileService) {}

  @Get('exchange-rates')
  async getExchangeRates(): Promise<any> {
    return this.mobileService.getExchangeRates();
  }
}
