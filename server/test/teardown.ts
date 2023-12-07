import 'tsconfig-paths/register';

import { TestUtil } from './utils/test.util';
import { NestExpressApplication } from '@nestjs/platform-express';

module.exports = async (globalConfig: any, projectConfig: any) => {
  // @ts-ignore
  const testUtil = globalThis._testUtil as TestUtil;
  await testUtil.teardown();

  if (process.env.APP) {
    // @ts-ignore
    const app = globalThis._app as NestExpressApplication;
    await app
      .close()
      .then(() => {
        console.log('✅ Http server closed.');
        process.exit(0);
      })
      .catch((error) => {
        console.error(`❌ Http server closed with error: ${error}`);
        process.exit(1);
      });
  }
};
