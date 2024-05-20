import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { MerchantsService } from '../merchants.service';
import { Merchant } from '../merchant.entity';

@Controller('merchants')
export class MerchantsController {
  constructor(private readonly merchantsService: MerchantsService) {}

  @Post()
  async registerMerchant(@Body() merchantData: any): Promise<Merchant> {
    const { name } = merchantData;
    return this.merchantsService.registerMerchant(name);
  }

  @Get(':id')
  async getMerchantById(@Param('id') id: string): Promise<Merchant> {
    return this.merchantsService.getMerchant(id);
  }

  @Get('settlement-history/:id')
  async getSettlementHistory(@Param('id') id: string): Promise<Merchant> {
    return this.merchantsService.getMerchant(id);
  }
}
