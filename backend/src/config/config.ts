import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const YAML_CONFIG_FILENAME = 'config.yml';

export const loadConfiguration = () => {
  try {
    const data = yaml.load(
      readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'),
    ) as Record<string, any>;
    return {
      isDev: data.isDev,
      http: {
        host: data.http.host,
        port: data.http.port,
        jwtSecret: data.http.jwtSecret,
      },
      database: {
        host: data.db.host,
        port: data.db.port,
        user: data.db.user,
        password: data.db.password,
        dbName: data.db.dbName,
      },
    };
  } catch (error) {
    if ((error as { code: string })?.code === 'ENOENT') {
      throw new Error(
        `FILE NOT FOUND: config/config.yml was not found. If you're setting up dev environment: copy config/config.dev.yml file as config/config.yml`,
      );
    }
    throw error;
  }
};
