import { Injectable } from '@nestjs/common';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ConduitDefinitionSeederService {
  async create(): Promise<void> {
    const admin = await this.userService.findOneByUsername('admin');
    if (admin == null) {
      throw new Error('user admin was not found');
    }
    await this.conduitDefinitionService.create(
      ConduitDefinition.of({
        author: admin,
        name: 'BrightByte',
        createdAt: new Date(),
      }),
    );
    await this.conduitDefinitionService.create(
      ConduitDefinition.of({
        author: admin,
        name: 'SymTech',
        createdAt: new Date(),
      }),
    );
    await this.conduitDefinitionService.create(
      ConduitDefinition.of({
        author: admin,
        name: 'Exertus',
        createdAt: new Date(),
      }),
    );
  }

  constructor(
    private conduitDefinitionService: ConduitDefinitionService,
    private userService: UserService,
  ) {}
}
