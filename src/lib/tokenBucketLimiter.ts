// implements Token Bucket rate limiting algorithm: https://en.wikipedia.org/wiki/Token_bucket
export class TokenBucketLimiter {
  private bucketCapacity:number
  private tokenRate:number
  private _tokenCount:number
  private _timeOfLastFill: Date

  constructor(capacity,fillRate){
    this.bucketCapacity = capacity
    this.tokenRate = fillRate
    this._tokenCount = 0
    this._timeOfLastFill = new Date()
  }

  // request to perform an operation that would consume a number of tokens
  requestConsumeTokens(tokenCount:number):boolean{
    if(this.bucketCapacity < tokenCount){
      return false;
    }

    this.bucketCapacity -= tokenCount
    return true
  }
}