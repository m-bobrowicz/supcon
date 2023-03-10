import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadConfiguration } from 'src/config/config';
import { SeederService } from 'dev/seeder/seeder.service';
import { UserSeederService } from 'dev/seeder/user/user-seeder.service';
import { UserModule } from 'src/user/user.module';

const configuration = loadConfiguration();

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configuration.database.host,
      port: configuration.database.port,
      username: configuration.database.user,
      password: configuration.database.password,
      database: configuration.database.dbName,
      autoLoadEntities: true,
      synchronize: false,
    }),
  ],
  providers: [SeederService, UserSeederService],
  exports: [SeederService],
})
export class SeederModule {}
