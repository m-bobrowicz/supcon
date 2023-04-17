import { Module } from '@nestjs/common';
import { ConduitParserService } from 'src/conduit/parser/parser.service';

@Module({
  imports: [],
  providers: [ConduitParserService],
  exports: [ConduitParserService],
  controllers: [],
})
export class ConduitParserModule {}
