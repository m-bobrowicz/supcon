import 'tsconfig-paths/register';
import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import NodeEnvironment from 'jest-environment-node';
import { SeederModule } from 'dev/seeder/seeder.module';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { User } from 'src/user/user.entity';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from 'testcontainers';
import { SeederService } from 'dev/seeder/seeder.service';

export default class TestEnvironment extends NodeEnvironment {
  container: StartedPostgreSqlContainer;

  public async setup(): Promise<void> {
    await super.setup();
    this.container = await new PostgreSqlContainer().start();

    const containerConfig = {
      host: this.container.getHost(),
      port: this.container.getPort(),
      username: this.container.getUsername(),
      password: this.container.getPassword(),
      database: this.container.getDatabase(),
    };
    this.global.container = containerConfig;

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: containerConfig.host,
          port: containerConfig.port,
          username: containerConfig.username,
          password: containerConfig.password,
          database: containerConfig.database,
          entities: [ConduitDefinition, User],
          synchronize: true,
          dropSchema: false,
        }),
        SeederModule,
      ],
    }).compile();
    const app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.get(SeederService).seed();
    await app.close();
  }

  public async teardown(): Promise<void> {
    await this.container.stop();
    await super.teardown();
  }
}
