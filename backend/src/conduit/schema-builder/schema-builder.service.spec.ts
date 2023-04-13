import { InputSchemaType } from 'src/conduit/input-schema/input-schema-type';
import { ConduitSchemaBuilderService } from 'src/conduit/schema-builder/schema-builder.service';

describe(ConduitSchemaBuilderService.name, () => {
  const service = new ConduitSchemaBuilderService();

  it('should return empty schema if records are empty', async () => {
    expect(await service.build([])).toEqual([]);
  });

  it('should guess string', async () => {
    const columnName = 'someStringColumn';
    const records = buildColumns(3, {
      [columnName]: ['some', 'string', 'values'],
    });
    expect(await service.build(records)).toEqual([
      { name: columnName, type: InputSchemaType.STRING },
    ]);
  });

  it('should guess number', async () => {
    const columnName = 'someNumberColumn';
    const records = buildColumns(1, {
      [columnName]: [
        'true',
        'false',
        'TRUE',
        'FALSE',
        'y',
        'n',
        'Y',
        'N',
        'yes',
        'no',
        'YES',
        'NO',
      ],
    });
    expect(await service.build(records)).toEqual([
      { name: columnName, type: InputSchemaType.BOOLEAN },
    ]);
  });

  it('should guess number', async () => {
    const columnName = 'someNumberColumn';
    const records = buildColumns(1, {
      [columnName]: ['1', ' 2', ' 3 ', '4 ', '1.5', '1,5'],
    });
    expect(await service.build(records)).toEqual([
      { name: columnName, type: InputSchemaType.NUMBER },
    ]);
  });

  it('should guess date', async () => {
    const columnName = 'someDateColumn';
    const records = buildColumns(1, {
      [columnName]: [
        '2023-03-25T22:43:42.032Z',
        ...[
          '2023.03.25',
          '2023-03-25',
          '2023/03/25',
          '2023 03 25',
          '25.03.2023',
          '25-03-2023',
          '25/03/2023',
          '25 03 2023',
          '03.25.2023',
          '03-25-2023',
          '03/25/2023',
          '03 25 2023',
        ].flatMap((date) => [`${date} 22:43:42`, `${date} 22:43`, `${date}`]),
      ],
    });
    expect(await service.build(records)).toEqual([
      { name: columnName, type: InputSchemaType.DATE },
    ]);
  });
});

const buildColumns = (
  recordCount: number,
  valuesByColumn: Record<string, Array<string | null>>,
): Record<string, string | null>[] =>
  Array.from({ length: recordCount }).map((_, index) =>
    Object.keys(valuesByColumn).reduce(
      (record, columnName) => ({
        ...record,
        [columnName]: valuesByColumn[columnName][index],
      }),
      {},
    ),
  );
