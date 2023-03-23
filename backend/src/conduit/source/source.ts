import { FormatConfig } from 'src/conduit/source/format-config';
import { ProtocolConfig } from 'src/conduit/source/protocol-config';

export interface ConduitSource {
  protocolConfig: ProtocolConfig;
  formatConfig: FormatConfig;
}
