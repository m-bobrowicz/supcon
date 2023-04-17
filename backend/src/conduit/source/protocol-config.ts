import { ProtocolType } from 'src/conduit/source/protocol-type';

interface BaseProtocolConfig {
  protocolType: ProtocolType;
}

export interface HttpProtocolConfig extends BaseProtocolConfig {
  protocolType: ProtocolType.HTTP;
  url: string;
  timeoutInMs: number;
}

export type ProtocolConfig = HttpProtocolConfig;
