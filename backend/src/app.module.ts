import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { loadConfiguration } from 'src/config/config';
import { SeederModule } from 'src/seeder/seeder.module';
import { UserModule } from 'src/user/user.module';

const configuration = loadConfiguration();

@Module({
  imports: [
    ConfigModule.forRoot({ load: [loadConfiguration] }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.database.host,
      port: configuration.database.port,
      username: configuration.database.user,
      password: configuration.database.password,
      database: configuration.database.dbName,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    SeederModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: LocalAuthGuard }],
})
export class AppModule {}
