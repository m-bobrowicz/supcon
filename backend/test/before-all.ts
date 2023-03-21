import { TestEnvironment } from './test-environment';

beforeAll(async () => {
  await TestEnvironment.initDatabase();
});
