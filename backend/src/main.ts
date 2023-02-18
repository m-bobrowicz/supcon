import { NestFactory } from '@nestjs/core';
import { AppModule } from 'src/app.module';
import { loadConfiguration } from 'src/config/config';
import { SeederModule } from 'src/seeder/seeder.module';
import { SeederService } from 'src/seeder/seeder.service';

const config = loadConfiguration();

async function bootstrap() {
  if (config.isDev) {
    await NestFactory.createApplicationContext(SeederModule)
      .then((appContext) => {
        return appContext
          .get(SeederService)
          .seed()
          .finally(() => appContext.close());
      })
      .catch((error) => {
        throw error;
      });
  }

  const app = await NestFactory.create(AppModule);
  await app.listen(config.http.port);
}
bootstrap();
