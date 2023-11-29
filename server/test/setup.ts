/* eslint-disable @typescript-eslint/no-unused-vars */
import 'tsconfig-paths/register';

import { TestUtil } from './utils/test.util';

module.exports = async (globalConfig: any, projectConfig: any) => {
  const testUtil = new TestUtil();
  await testUtil.setup();
  testUtil.seed();
  // @ts-ignore
  globalThis._testUtil = testUtil;
};
