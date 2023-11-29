import 'tsconfig-paths/register';

import { TestUtil } from './utils/test.util';

module.exports = async (globalConfig: any, projectConfig: any) => {
  // @ts-ignore
  const testUtil = globalThis._testUtil as TestUtil;
  await testUtil.teardown();
};
