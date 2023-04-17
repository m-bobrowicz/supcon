import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConduitDefinitionController } from 'src/conduit/definition/definition.controller';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';
import { ConduitInputSchemaModule } from 'src/conduit/input-schema/input-schema.module';
import { ConduitParserModule } from 'src/conduit/parser/parser.module';
import { ConduitSchemaBuilderModule } from 'src/conduit/schema-builder/schema-builder.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConduitDefinition]),
    EventEmitterModule,
    HttpModule,
    ConduitParserModule,
    ConduitSchemaBuilderModule,
    ConduitInputSchemaModule,
  ],
  providers: [ConduitDefinitionService],
  exports: [ConduitDefinitionService, TypeOrmModule],
  controllers: [ConduitDefinitionController],
})
export class ConduitDefinitionModule {}
