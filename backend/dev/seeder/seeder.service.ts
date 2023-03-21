import { Injectable, Logger } from '@nestjs/common';
import { ConduitDefinitionSeederService } from 'dev/seeder/conduit-definition/conduit-definition-seeder.service';
import { UserSeederService } from 'dev/seeder/user/user-seeder.service';

@Injectable()
export class SeederService {
  async seed() {
    this.logger.debug('Seeding started');
    await this.userSeederService
      .create()
      .then(() => {
        this.logger.debug('Successfuly seeded users');
      })
      .catch((error) => {
        this.logger.error('Failed seeding users...');
        throw error;
      });
    await this.conduitDefinitionSeederService
      .create()
      .then(() => {
        this.logger.debug('Successfuly seeded conduit definitions');
      })
      .catch((error) => {
        this.logger.error('Failed seeding conduit definitions...');
        throw error;
      });
    this.logger.debug('Seeding finished');
  }

  constructor(
    private readonly userSeederService: UserSeederService,
    private readonly conduitDefinitionSeederService: ConduitDefinitionSeederService,
  ) {}

  private readonly logger = new Logger(SeederService.name);
}
