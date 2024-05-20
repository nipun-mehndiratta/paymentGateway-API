// src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CryptoModule } from './modules/crypto/crypto.module';
import { ConfigModule } from '@nestjs/config';
import { MerchantsModule } from './modules/merchants/merchants.module';
import { MobileModule } from './modules/mobile/mobile.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    HttpModule,
    CryptoModule,
    MerchantsModule,
    MobileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
