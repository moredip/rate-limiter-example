import test from 'ava'

import { TokenBucketLimiter } from './tokenBucketLimiter';

test('big bucket has room at start', (t) => {
  const limiter = new TokenBucketLimiter(100,10)
  const succeeded = limiter.requestConsumeTokens(1)
  t.true(succeeded)
});