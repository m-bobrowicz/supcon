import { readFileSync, readdirSync, existsSync } from 'fs';
import * as yaml from 'js-yaml';
import { resolve } from 'path';

const YAML_CONFIG_FILENAMES = ['config.yml', 'config/config.yml'];

export const loadConfiguration = () => {
  readdirSync(process.cwd()).forEach((file) => {
    console.log(file);
  });
  const location = YAML_CONFIG_FILENAMES.find((it) => {
    const filePath = resolve(it);
    console.log(`checking for ${filePath}...`);
    const isExisting = existsSync(filePath);
    console.log(
      isExisting ? `${filePath} exists` : `${filePath} does not exist`,
    );
    return isExisting;
  });

  if (location == null) {
    throw new Error(
      `FILE NOT FOUND: config was not found. If you're setting up dev environment: copy config/config.dev.yml file as config/config.yml`,
    );
  }

  const path = resolve(location);
  const data = yaml.load(readFileSync(path, 'utf8')) as Record<string, any>;
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
};
