import { TestEnvironment } from './test-environment';

afterAll(async () => {
  await TestEnvironment.stopDatabase();
});
