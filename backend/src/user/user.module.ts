/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncryptModule } from 'src/encrypt/encrypt.module';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptModule],
  providers: [UserService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
