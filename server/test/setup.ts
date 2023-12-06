/* eslint-disable @typescript-eslint/no-unused-vars */
import 'tsconfig-paths/register';

import { TestUtil } from './utils/test.util';
import { bootstrap } from '@/main';

module.exports = async (globalConfig: any, projectConfig: any) => {
  // const app = await bootstrap();

  const testUtil = new TestUtil();
  await testUtil.setup();
  testUtil.seed();

  // @ts-ignore
  // globalThis._app = app;
  // @ts-ignore
  globalThis._testUtil = testUtil;
};
