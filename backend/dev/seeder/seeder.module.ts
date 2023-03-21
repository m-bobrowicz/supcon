import { Module } from '@nestjs/common';
import { ConduitDefinitionSeederService } from 'dev/seeder/conduit-definition/conduit-definition-seeder.service';
import { SeederService } from 'dev/seeder/seeder.service';
import { UserSeederService } from 'dev/seeder/user/user-seeder.service';
import { ConduitDefinitionModule } from 'src/conduit/definition/definition.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, ConduitDefinitionModule],
  providers: [SeederService, UserSeederService, ConduitDefinitionSeederService],
  exports: [SeederService],
})
export class SeederModule {}
