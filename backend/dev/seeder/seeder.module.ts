import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { loadConfiguration } from 'src/config/config';
import { SeederService } from 'dev/seeder/seeder.service';
import { UserSeederService } from 'dev/seeder/user/user-seeder.service';
import { UserModule } from 'src/user/user.module';
import { ConduitDefinitionSeederService } from 'dev/seeder/conduit-definition/conduit-definition-seeder.service';
import { ConduitDefinitionModule } from 'src/conduit/definition/definition.module';

const configuration = loadConfiguration();

@Module({
  imports: [
    UserModule,
    ConduitDefinitionModule,
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
  providers: [SeederService, UserSeederService, ConduitDefinitionSeederService],
  exports: [SeederService],
})
export class SeederModule {}
