import 'jest-expect-message';

import * as extendedMatchers from 'jest-extended';
import { matchers as schemaMatchers } from 'jest-json-schema';

expect.extend(extendedMatchers);
expect.extend(schemaMatchers);
