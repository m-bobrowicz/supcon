import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ConduitDefinitionService {
  async create(conduitDefinition: ConduitDefinition): Promise<void> {
    await this.repository.save(conduitDefinition);
  }

  list(context: {
    page: number;
    limit: number;
    orderBy: 'name' | 'createdAt';
    orderDirection: 'ASC' | 'DESC';
  }): Promise<{ count: number; items: ConduitDefinition[] }> {
    const { page, limit } = context;
    const skip = (page - 1) * limit;
    const take = limit;
    const order = {
      [context.orderBy]: { direction: context.orderDirection, nulls: 'LAST' },
    };

    return this.repository
      .findAndCount({ skip, take, order })
      .then(([items, count]) => ({ count, items }));
  }

  constructor(
    @InjectRepository(ConduitDefinition)
    private repository: Repository<ConduitDefinition>,
  ) {}
}
