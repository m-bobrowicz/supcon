/* istanbul ignore file */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { AuthHttpFilter } from 'src/auth/auth-http.filter';
import { loadConfiguration } from 'src/config/config';
import { UserModule } from 'src/user/user.module';
import { ConduitDefinitionModule } from 'src/conduit/definition/definition.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

const configuration = loadConfiguration();

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ load: [loadConfiguration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.database.host,
      port: configuration.database.port,
      username: configuration.database.user,
      password: configuration.database.password,
      database: configuration.database.dbName,
      autoLoadEntities: true,
      synchronize: false,
      dropSchema: false,
    }),
    PassportModule.register({ session: false }),
    JwtModule.register({
      secret: configuration.http.jwtSecret,
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    UserModule,
    ConduitDefinitionModule,
  ],
  providers: [{ provide: APP_FILTER, useClass: AuthHttpFilter }],
})
export class AppModule {}
