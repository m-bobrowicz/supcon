import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConduitDefinitionController } from 'src/conduit/definition/definition.controller';
import { ConduitDefinition } from 'src/conduit/definition/definition.entity';
import { ConduitDefinitionService } from 'src/conduit/definition/definition.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConduitDefinition])],
  providers: [ConduitDefinitionService],
  exports: [ConduitDefinitionService, TypeOrmModule],
  controllers: [ConduitDefinitionController],
})
export class ConduitDefinitionModule {}
