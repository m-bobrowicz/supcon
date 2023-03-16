import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitDefinitionModule } from 'src/conduit/definition/definition.module';
import { User } from 'src/user/user.entity';
import * as request from 'supertest';

describe('ConduitDefinitionController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const container = (globalThis as any).container;
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: container.host,
          port: container.port,
          username: container.username,
          password: container.password,
          database: container.database,
          entities: [ConduitDefinition, User],
          synchronize: false,
          dropSchema: false,
        }),
        ConduitDefinitionModule,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: () => true,
      })
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
        console.log(JSON.stringify(res.body.items));
        expect(res.body.count).toEqual(3);
        expect(res.body.items.map((it: any) => it.name)).toEqual([
          'BrightByte',
          'Exertus',
          'SymTech',
        ]);
      });
  });
});
