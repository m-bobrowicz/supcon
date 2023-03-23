import { FormatType } from 'src/conduit/source/fomat-type';

interface BaseFormatConfig {
  formatType: FormatType;
}

export interface CsvFormatConfig extends BaseFormatConfig {
  formatType: FormatType.CSV;
}

export type FormatConfig = CsvFormatConfig;
