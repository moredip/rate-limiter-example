import { TokenBucketLimiter } from './tokenBucketLimiter';

describe(TokenBucketLimiter, () => {
  test('big bucket has room at start', () => {
    const limiter = new TokenBucketLimiter(100,10)
    const succeeded = limiter.requestConsumeTokens(1)
    expect(succeeded).toBe(true)
  });
  test('bucket eventually runs out of room', () => {
    const limiter = new TokenBucketLimiter(10,10)
    limiter.requestConsumeTokens(5)
    limiter.requestConsumeTokens(5)
    const succeeded = limiter.requestConsumeTokens(5)
    expect(succeeded).toBe(false)
  });
});