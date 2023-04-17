import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { InputSchemaNode } from 'src/conduit/input-schema/input-schema-node';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToOne(() => ConduitDefinition, (e) => e.schema)
  @JoinColumn()
  conduitDefinition: ConduitDefinition;
}
