import { HttpService } from '@nestjs/axios';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { of } from 'rxjs';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';
import { InputSchemaType } from 'src/conduit/input-schema/input-schema-type';
import { ConduitInputSchema } from 'src/conduit/input-schema/input-schema.entity';
import { InputSchemaService } from 'src/conduit/input-schema/input-schema.service';
import { ConduitParserModule } from 'src/conduit/parser/parser.module';
import { ConduitSchemaBuilderModule } from 'src/conduit/schema-builder/schema-builder.module';
import { FormatType } from 'src/conduit/source/fomat-type';
import { ProtocolType } from 'src/conduit/source/protocol-type';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { User } from 'src/user/user.entity';

describe(ConduitDefinitionService.name, () => {
  let service: ConduitDefinitionService;

  let repository: Record<
    'findAndCount' | 'findOneOrFail' | 'save' | 'update',
    jest.Mock
  >;
  let encrypt: Record<'encrypt', jest.Mock>;
  let eventEmitter2: Record<'emit', jest.Mock>;
  let httpService: Record<'get', jest.Mock>;
  let inputSchemaService: Record<'create', jest.Mock>;

  beforeEach(async () => {
    repository = {
      findAndCount: jest.fn(),
      save: jest.fn(),
      findOneOrFail: jest.fn(),
      update: jest.fn(),
    };
    encrypt = { encrypt: jest.fn() };
    eventEmitter2 = { emit: jest.fn() };
    httpService = { get: jest.fn() };
    inputSchemaService = { create: jest.fn() };
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: EncryptService, useValue: encrypt },
        {
          provide: getRepositoryToken(ConduitDefinition),
          useValue: repository,
        },
        ConduitDefinitionService,
        { provide: EventEmitter2, useValue: eventEmitter2 },
        { provide: HttpService, useValue: httpService },
        { provide: InputSchemaService, useValue: inputSchemaService },
      ],
      imports: [ConduitParserModule, ConduitSchemaBuilderModule],
    }).compile();

    service = moduleRef.get<ConduitDefinitionService>(ConduitDefinitionService);
  });

  it('should list definitions from repository', async () => {
    repository.findAndCount.mockReturnValue(Promise.resolve([[{}], 1]));

    const result = await service.list({
      limit: 10,
      page: 3,
      orderBy: 'createdAt',
      orderDirection: 'DESC',
    });
    expect(repository.findAndCount).toHaveBeenCalledWith({
      skip: 20,
      take: 10,
      order: {
        createdAt: { direction: 'DESC', nulls: 'LAST' },
      },
    });
    expect(result).toEqual({
      count: 1,
      items: [{}],
    });
  });

  it('should create conduit definition', async () => {
    repository.save.mockReturnValue(Promise.resolve());

    const conduitDefinition = ConduitDefinition.of({
      name: 'someConduitDefinition',
      author: {} as User,
      createdAt: new Date(),
      source: {
        formatConfig: { formatType: FormatType.CSV },
        protocolConfig: {
          protocolType: ProtocolType.HTTP,
          url: 'https://supcon-http.onrender.com/sources/csv/sym-tech.csv',
          timeoutInMs: 1000,
        },
      },
    });

    await service.create(conduitDefinition);
    expect(repository.save).toHaveBeenCalledWith(conduitDefinition);
  });

  it('should build schema', async () => {
    repository.save.mockReturnValue(Promise.resolve());
    const csv = `
col1,col2,col3,col4
1,apple,red,0.5
2,banana,yellow,0.3
3,orange,orange,0.8
4,grape,purple,0.1
`.trim();

    httpService.get.mockReturnValue(of({ data: csv }));

    const conduitDefinition = ConduitDefinition.of({
      name: 'someConduitDefinition',
      author: {} as User,
      createdAt: new Date(),
      source: {
        formatConfig: { formatType: FormatType.CSV },
        protocolConfig: {
          protocolType: ProtocolType.HTTP,
          url: 'https://supcon-http.onrender.com/sources/csv/sym-tech.csv',
          timeoutInMs: 1000,
        },
      },
    });

    repository.findOneOrFail.mockReturnValue(conduitDefinition);
    inputSchemaService.create.mockImplementation((schema) => {
      console.log(schema);
      schema.id = 'someSchemaId';
      return schema;
    });
    repository.update.mockImplementation((_, { schema }) => {
      conduitDefinition.schema = schema;
    });

    await service.create(conduitDefinition);
    await service.buildSchema(conduitDefinition.id);

    expect(conduitDefinition.schema).toEqual(
      ConduitInputSchema.of({
        id: 'someSchemaId',
        nodes: [
          { name: 'col1', type: InputSchemaType.NUMBER },
          { name: 'col2', type: InputSchemaType.STRING },
          { name: 'col3', type: InputSchemaType.STRING },
          { name: 'col4', type: InputSchemaType.NUMBER },
        ],
      }),
    );
  });
});
