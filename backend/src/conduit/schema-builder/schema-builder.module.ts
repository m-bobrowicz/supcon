import { Module } from '@nestjs/common';
import { ConduitSchemaBuilderService } from 'src/conduit/schema-builder/schema-builder.service';

@Module({
  imports: [],
  providers: [ConduitSchemaBuilderService],
  exports: [ConduitSchemaBuilderService],
  controllers: [],
})
export class ConduitSchemaBuilderModule {}
