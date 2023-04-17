import { Injectable } from '@nestjs/common';
import { InputSchemaNode } from 'src/conduit/input-schema/input-schema-node';
import { InputSchemaType } from 'src/conduit/input-schema/input-schema-type';

const NUMBER_REGEXP = /^-?\d+(?:[.,]\d+)?$/;
const numberTest = (it: string) => NUMBER_REGEXP.test(it);
const dateTest = (it: string) => false === isNaN(Date.parse(it));
const BOOLEAN_REGEXP = /^(true|false|yes|no|y|n)$/;
const booleanTest = (it: string) => BOOLEAN_REGEXP.test(it.toLowerCase());

@Injectable()
export class ConduitSchemaBuilderService {
  build(records: Record<string, string | null>[]): InputSchemaNode[] {
    const valuesByColumn = records.reduce(
      (acc, record) => ({
        ...acc,
        ...Object.entries(record).reduce((recordAcc, [column, rawValue]) => {
          if (rawValue == null) {
            return recordAcc;
          }
          const value = rawValue?.trim();
          if (recordAcc[column] == null) {
            return { ...recordAcc, [column]: [value] };
          }
          return { ...recordAcc, [column]: [...recordAcc[column], value] };
        }, acc),
      }),
      {} as Record<string, string[]>,
    );

    const nodes = Object.entries(valuesByColumn).map(
      ([columnName, values]): InputSchemaNode => ({
        type: this.guessType(values),
        name: columnName,
      }),
    );
    return nodes;
  }

  private guessType(values: Array<string>): InputSchemaType {
    if (values.length === 0) {
      return InputSchemaType.STRING;
    }

    if (values.every(booleanTest)) {
      return InputSchemaType.BOOLEAN;
    }
    if (values.every(numberTest)) {
      return InputSchemaType.NUMBER;
    }
    if (values.every(dateTest)) {
      return InputSchemaType.DATE;
    }

    return InputSchemaType.STRING;
  }
}
