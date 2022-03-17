// implements Token Bucket rate limiting algorithm: https://en.wikipedia.org/wiki/Token_bucket
export class TokenBucketLimiter {
  private bucketCapacity:number
  private tokenRate:number
  private _tokenCount:number
  private _timeOfLastFill: Date

  constructor(capacity,fillRate){
    this.bucketCapacity = capacity
    this.tokenRate = fillRate
    this._tokenCount = capacity
    this._timeOfLastFill = new Date()
  }

  // request to perform an operation that would consume a number of tokens
  requestConsumeTokens(tokenCount:number):boolean{
    this.refresh()

    if(this._tokenCount < tokenCount){
      return false;
    }

    this._tokenCount -= tokenCount
    return true
  }

  private refresh(){
    const now = new Date();
    const delta = now.getTime() - this._timeOfLastFill.getTime()

    const newTokens = this.tokenRate/1000*delta
    this._tokenCount += newTokens
    this._timeOfLastFill = new Date()
  }
}