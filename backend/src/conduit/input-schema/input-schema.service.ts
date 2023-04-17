import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConduitInputSchema } from 'src/conduit/input-schema/input-schema.entity';
import { Repository } from 'typeorm';

@Injectable()
export class InputSchemaService {
  async create(schema: ConduitInputSchema): Promise<ConduitInputSchema> {
    await this.repository.insert(schema);
    return schema;
  }

  findById(id: string): Promise<ConduitInputSchema> {
    return this.repository.findOneByOrFail({ id });
  }

  constructor(
    @InjectRepository(ConduitInputSchema)
    private repository: Repository<ConduitInputSchema>,
  ) {}
}
