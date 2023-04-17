import { ConduitParserService } from 'src/conduit/parser/parser.service';

describe(ConduitParserService.name, () => {
  const service = new ConduitParserService();

  it('should return empty list for empty csv', async () => {
    expect(await service.parseCsv(``)).toEqual([]);
  });

  it('should return key-value records', async () => {
    const csv = `
col1,col2,col3,col4
1,apple,red,0.5
2,banana,yellow,0.3
3,orange,orange,0.8
4,grape,purple,0.1
`.trim();

    expect(await service.parseCsv(csv)).toEqual([
      { col1: '1', col2: 'apple', col3: 'red', col4: '0.5' },
      { col1: '2', col2: 'banana', col3: 'yellow', col4: '0.3' },
      { col1: '3', col2: 'orange', col3: 'orange', col4: '0.8' },
      { col1: '4', col2: 'grape', col3: 'purple', col4: '0.1' },
    ]);
  });
});
