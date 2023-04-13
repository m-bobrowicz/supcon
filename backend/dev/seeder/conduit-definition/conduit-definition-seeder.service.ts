import { Injectable } from '@nestjs/common';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';
import { FormatType } from 'src/conduit/source/fomat-type';
import { ProtocolType } from 'src/conduit/source/protocol-type';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ConduitDefinitionSeederService {
  async create(): Promise<void> {
    const author = await this.userService.findOneByUsername('admin');

    await [
      {
        name: 'BrightByte',
        url: 'https://supcon-http.onrender.com/sources/csv/bright-byte.csv',
      },
      {
        name: 'SymTech',
        url: 'https://supcon-http.onrender.com/sources/csv/sym-tech.csv',
      },
      {
        name: 'Exertus',
        url: 'https://supcon-http.onrender.com/sources/csv/exertus.csv',
      },
    ].reduce(async (promise, { name, url }) => {
      await promise;

      const conduit = await this.conduitDefinitionService.create(
        ConduitDefinition.of({
          author,
          name,
          createdAt: new Date(),
          source: {
            formatConfig: { formatType: FormatType.CSV },
            protocolConfig: {
              protocolType: ProtocolType.HTTP,
              url,
              timeoutInMs: 10000,
            },
          },
        }),
      );
      await this.conduitDefinitionService.buildSchema(conduit.id);
    }, Promise.resolve());
  }

  constructor(
    private conduitDefinitionService: ConduitDefinitionService,
    private userService: UserService,
  ) {}
}
