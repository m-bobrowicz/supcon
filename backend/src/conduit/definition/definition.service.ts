import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { firstValueFrom } from 'rxjs';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitInputSchema } from 'src/conduit/input-schema/input-schema.entity';
import { InputSchemaService } from 'src/conduit/input-schema/input-schema.service';
import { ConduitParserService } from 'src/conduit/parser/parser.service';
import { ConduitSchemaBuilderService } from 'src/conduit/schema-builder/schema-builder.service';
import { ConduitDefinitionEvents } from 'src/shared/events';
import { Repository } from 'typeorm';

@Injectable()
export class ConduitDefinitionService {
  findById(id: string): Promise<ConduitDefinition> {
    return this.repository.findOneOrFail({ where: { id } });
  }

  findSchemaById(id: string): Promise<ConduitDefinition> {
    return this.repository.findOneOrFail({
      select: { schemaId: true },
      where: { id },
    });
  }

  async create(
    conduitDefinition: ConduitDefinition,
  ): Promise<ConduitDefinition> {
    await this.repository.save(conduitDefinition);
    this.eventEmitter2.emit(ConduitDefinitionEvents.Created, {
      conduitDefinition,
    });
    return conduitDefinition;
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

  async buildSchema(conduitDefinitionId: string) {
    const conduitDefinition = await this.repository.findOneOrFail({
      where: { id: conduitDefinitionId },
    });
    const { url, timeoutInMs } = conduitDefinition.source.protocolConfig;
    const { data: csvString } = await firstValueFrom(
      this.httpService.get(url, { timeout: timeoutInMs }),
    );
    const parsedData = await this.parser.parseCsv(csvString);
    const schema = await this.inputSchemaService.create(
      ConduitInputSchema.of({ nodes: this.schemaBuilder.build(parsedData) }),
    );
    await this.repository.update({ id: conduitDefinition.id }, { schema });
  }

  constructor(
    @InjectRepository(ConduitDefinition)
    private repository: Repository<ConduitDefinition>,
    private eventEmitter2: EventEmitter2,
    private httpService: HttpService,
    private inputSchemaService: InputSchemaService,
    private parser: ConduitParserService,
    private schemaBuilder: ConduitSchemaBuilderService,
  ) {}
}
