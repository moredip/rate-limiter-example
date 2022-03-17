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

  test('bucket refills after running out of room', async () => {
    const limiter = new TokenBucketLimiter(10,5)

    limiter.requestConsumeTokens(9)
    while(limiter.requestConsumeTokens(1)){}

    await sleep(2000)
    const succeeded = limiter.requestConsumeTokens(5)

    expect(succeeded).toBe(true)
  });
});

function sleep(duration:number){
  return new Promise((resolve) => {
      setTimeout(resolve, duration);
  });
}