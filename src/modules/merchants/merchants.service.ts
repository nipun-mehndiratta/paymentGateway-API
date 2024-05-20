import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Merchant } from './merchant.entity';

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantRepository: Repository<Merchant>,
  ) {}

  async registerMerchant(name: string): Promise<Merchant> {
    const merchant = this.merchantRepository.create({
      name,
      settlementHistory: [],
    });
    return this.merchantRepository.save(merchant);
  }

  async getMerchant(id: string): Promise<Merchant> {
    return this.merchantRepository.findOne({ where: { id } });
  }

  async creditAccount(id: string, amount: number): Promise<Merchant> {
    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) throw new Error('Merchant not found');

    merchant.accountBalance += amount;
    merchant.settlementHistory.push({ amount, date: new Date() });
    return this.merchantRepository.save(merchant);
  }

  async getSettlementHistory(
    id: string,
  ): Promise<{ amount: number; date: Date }[]> {
    const merchant = await this.merchantRepository.findOne({ where: { id } });
    if (!merchant) throw new Error('Merchant not found');

    return merchant.settlementHistory;
  }
}
