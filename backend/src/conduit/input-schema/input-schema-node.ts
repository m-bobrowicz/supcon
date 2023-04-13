import { InputSchemaType } from 'src/conduit/input-schema/input-schema-type';

export interface InputSchemaNode {
  name: string;
  type: InputSchemaType;
  children?: InputSchemaNode[];
}
