import { Module } from '@nestjs/common';
import { MobileService } from './mobile.service';
import { MobileController } from './controllers/mobile.controller';

@Module({
  providers: [MobileService],
  controllers: [MobileController],
})
export class MobileModule {}
