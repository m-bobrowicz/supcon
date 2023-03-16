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
  }): Promise<{ count: number; items: ConduitDefinition[] }> {
    const { page, limit } = context;
    const skip = (page - 1) * limit;
    const take = limit;
    return this.repository
      .findAndCount({
        skip,
        take,
        order: { name: { direction: 'ASC', nulls: 'LAST' } },
      })
      .then(([items, count]) => ({ count, items }));
  }

  constructor(
    @InjectRepository(ConduitDefinition)
    private repository: Repository<ConduitDefinition>,
  ) {}
}
