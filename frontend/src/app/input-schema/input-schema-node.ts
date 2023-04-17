import { InputSchemaType } from 'src/app/input-schema/input-schema-type';

export interface InputSchemaNode {
  name: string;
  type: InputSchemaType;
  children?: InputSchemaNode[];
}
