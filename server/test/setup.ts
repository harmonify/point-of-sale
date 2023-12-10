/* eslint-disable @typescript-eslint/no-unused-vars */
import 'tsconfig-paths/register';

import { TestUtil } from './test.service';
import { bootstrap } from '@/main';

module.exports = async (globalConfig: any, projectConfig: any) => {
  const testUtil = new TestUtil();
  await testUtil.setup();
  testUtil.seed();
  // @ts-ignore
  globalThis._testUtil = testUtil;

  if (process.env.APP) {
    const app = await bootstrap();
    // @ts-ignore
    globalThis._app = app;
  }
};
