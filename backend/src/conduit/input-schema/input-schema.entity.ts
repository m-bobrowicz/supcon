import { InputSchemaNode } from 'src/conduit/input-schema/input-schema-node';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'sc_conduit_input_schema' })
export class ConduitInputSchema {
  public static of(data: {
    id?: string;
    nodes: InputSchemaNode[];
  }): ConduitInputSchema {
    const entity = new ConduitInputSchema();
    if (data.id != null) {
      entity.id = data.id;
    }
    entity.nodes = data.nodes;
    return entity;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('jsonb', { nullable: false, default: [] })
  nodes: InputSchemaNode[];
}
