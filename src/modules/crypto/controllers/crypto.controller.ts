import { Controller, Post, Req, Query, Body } from '@nestjs/common';
import { CryptoService } from '../crypto.service';

@Controller('crypto')
export class CryptoController {
  constructor(private readonly cryptoService: CryptoService) {}

  @Post('payment')
  async initiatePayment(
    @Query('merchantId') merchantId: string,
    @Body() payloadData: any,
  ): Promise<any> {
    return this.cryptoService.createCheckoutSession(merchantId, payloadData);
  }

  @Post('webhooks')
  async handleWebhook(@Req() req: any): Promise<any> {
    const event = req.body;
    if (event.data.object.paymentStatus !== 'paid') {
      return;
    }

    const amount = event.data.object.amountTotal;
    const merchantId = event.data.object.metadata.merchantId;
    const fiatCurrency = event.data.object.metadata.fiatCurrency;
    const cryptoId = event.data.object.addresses[0].asset.coingeckoId;

    const updatedCryptoAmount = amount / 100;

    return this.cryptoService.convertToFiat(
      updatedCryptoAmount,
      cryptoId,
      fiatCurrency,
      merchantId,
    );
  }
}
