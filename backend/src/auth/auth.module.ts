import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/auth/auth.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { LocalStrategy } from 'src/auth/local.strategy';
import { loadConfiguration } from 'src/config/config';
import { UserModule } from 'src/user/user.module';

const config = loadConfiguration();

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({
      session: true,
    }),
    JwtModule.register({
      secret: config.http.jwtSecret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  exports: [JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
