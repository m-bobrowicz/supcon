import { HttpModule } from '@nestjs/axios';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConduitDefinitionModule } from 'src/conduit/definition/definition.module';
import { ConduitInputSchemaModule } from 'src/conduit/input-schema/input-schema.module';
import { UserModule } from 'src/user/user.module';
import * as request from 'supertest';

describe('ConduitDefinitionController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const container = (globalThis as any).container;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        EventEmitterModule.forRoot(),
        ConduitInputSchemaModule,
        ConduitDefinitionModule,
        UserModule,
        HttpModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: container.host,
          port: container.port,
          username: container.username,
          password: container.password,
          database: container.database,
          autoLoadEntities: true,
          synchronize: false,
          dropSchema: false,
        }),
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  it('should list conduit definitions', async () => {
    return request(app.getHttpServer())
      .post('/conduit-definition/list')
      .send({ page: 1, limit: 10 })
      .expect(201)
      .expect((res) => {
        expect(res.body.count).toEqual(3);
        expect(res.body.items.map((it: any) => it.name)).toEqual([
          'BrightByte',
          'Exertus',
          'SymTech',
        ]);
      });
  });
});
