import { Module } from '@nestjs/common';
import { EncryptService } from 'src/user/encrypt.service';

@Module({
  providers: [EncryptService],
  exports: [EncryptService],
})
export class EncryptModule {}
