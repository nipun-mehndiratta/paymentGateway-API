import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class MobileService {
  async getExchangeRates(): Promise<any> {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd',
      );
      const exchangeRates = response.data;
      return exchangeRates;
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
      throw new Error('Failed to fetch exchange rates');
    }
  }
}
