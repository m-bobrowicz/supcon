import { Logger, Module } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadConfiguration } from 'src/config/config';
import { SeederModule } from 'dev/seeder/seeder.module';
import { SeederService } from 'dev/seeder/seeder.service';

const configuration = loadConfiguration();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.database.host,
      port: configuration.database.port,
      username: configuration.database.user,
      password: configuration.database.password,
      database: configuration.database.dbName,
      autoLoadEntities: true,
      synchronize: true,
      dropSchema: true,
    }),
    SeederModule,
  ],
})
export class InitDatabaseModule {}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(InitDatabaseModule);
  if (configuration.isDev === false) {
    await app.get(Logger).log('app is not in dev mode, skipping');
    return;
  }
  await app.get(SeederService).seed();
  await app.close();
}
bootstrap();
