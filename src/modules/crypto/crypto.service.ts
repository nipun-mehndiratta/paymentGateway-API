import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { MerchantsService } from '../merchants/merchants.service';
import { AxiosRequestConfig } from 'axios';

@Injectable()
export class CryptoService {
  private readonly logger = new Logger(CryptoService.name);

  constructor(
    private httpService: HttpService,
    private readonly merchantsService: MerchantsService,
  ) {}

  async createCheckoutSession(id: string, payloadData: any): Promise<any> {
    const { amount, currency, fiatCurrency } = payloadData;
    if (!amount || !currency || !fiatCurrency) {
      throw new Error('Invalid payload data');
    }
    this.logger.log(`Creating checkout session for merchant ${id}`);

    const url = 'https://api.copperx.dev/api/v1/checkout/sessions';

    const options: AxiosRequestConfig = {
      method: 'POST',
      url,
      headers: {
        Authorization: `Bearer ${process.env.COPPERX_API_KEY}`,
        'Content-Type': 'application/json',
      },
      data: {
        successUrl: 'https://copperx.io/success?cid={CHECKOUT_SESSION_ID}',
        lineItems: {
          data: [
            {
              priceData: {
                currency: currency,
                unitAmount: amount * 100,
                productData: {
                  name: 'Basic',
                  description:
                    'For early stage projects who are getting started',
                },
              },
            },
          ],
        },
        metadata: {
          merchantId: id,
          fiatCurrency: fiatCurrency,
        },
      },
    };

    try {
      const response = await this.httpService.request(options).toPromise();
      return response.data;
    } catch (error) {
      this.logger.error(
        `Error creating checkout session for merchant ${id}: ${error.message}`,
      );
      throw new Error('Failed to create checkout session');
    }
  }

  async convertToFiat(
    cryptoAmount: number,
    cryptoId: string,
    fiatCurrency: string,
    merchantId: string,
  ): Promise<any> {
    try {
      const response = await this.httpService
        .get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoId}&vs_currencies=${fiatCurrency}`,
          {
            headers: {
              accept: 'application/json',
              'x-cg-demo-api-key': `${process.env.COINGECKO_API_KEY}`,
            },
          },
        )
        .toPromise();

      const fiatAmount =
        cryptoAmount *
        response.data[cryptoId.toLowerCase()][fiatCurrency.toLowerCase()];
      // Credit the fiat amount to the merchant's account
      await this.merchantsService.creditAccount(merchantId, fiatAmount);

      return {
        cryptoAmount,
        fiatAmount: fiatAmount,
        fiatCurrency,
      };
    } catch (error) {
      this.logger.error(`Error converting to fiat: ${error.message}`);
      throw new Error('Failed to convert to fiat');
    }
  }
}
