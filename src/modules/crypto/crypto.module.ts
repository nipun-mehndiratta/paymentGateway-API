import { Module } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import { CryptoController } from './controllers/crypto.controller';
import { HttpModule } from '@nestjs/axios';
import { MerchantsModule } from '../merchants/merchants.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [CryptoService],
  controllers: [CryptoController],
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    HttpModule,
    MerchantsModule,
  ],
})
export class CryptoModule {}
