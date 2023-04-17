import { Injectable } from '@nestjs/common';
import { parse } from 'csv-parse';

@Injectable()
export class ConduitParserService {
  async parseCsv(
    csvString: string,
    limit?: number,
  ): Promise<Record<string, string>[]> {
    const parser = parse(csvString, {
      delimiter: ',',
      columns: true,
      to_line: limit,
    });

    const records: Record<string, string>[] = [];
    for await (const record of parser) {
      records.push(record);
    }
    return records;
  }
}
