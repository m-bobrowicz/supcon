import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConduitInputSchema } from 'src/conduit/input-schema/input-schema.entity';
import { InputSchemaService } from 'src/conduit/input-schema/input-schema.service';

@Module({
  imports: [TypeOrmModule.forFeature([ConduitInputSchema])],
  providers: [InputSchemaService],
  exports: [InputSchemaService],
  controllers: [],
})
export class ConduitInputSchemaModule {}
