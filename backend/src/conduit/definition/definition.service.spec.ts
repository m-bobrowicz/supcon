import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';
import { FormatType } from 'src/conduit/source/fomat-type';
import { ProtocolType } from 'src/conduit/source/protocol-type';
import { EncryptService } from 'src/encrypt/encrypt.service';
import { User } from 'src/user/user.entity';

describe(ConduitDefinitionService.name, () => {
  let service: ConduitDefinitionService;

  let repository: { findAndCount: jest.Mock; save: jest.Mock };
  let encrypt: { encrypt: jest.Mock };

  beforeEach(async () => {
    repository = { findAndCount: jest.fn(), save: jest.fn() };
    encrypt = { encrypt: jest.fn() };
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: EncryptService, useValue: encrypt },
        {
          provide: getRepositoryToken(ConduitDefinition),
          useValue: repository,
        },
        ConduitDefinitionService,
      ],
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
        },
      },
    });

    await service.create(conduitDefinition);
    expect(repository.save).toHaveBeenCalledWith(conduitDefinition);
  });
});
