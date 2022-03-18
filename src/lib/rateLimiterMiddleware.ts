import { Request, Response, NextFunction, RequestHandler } from 'express'
import { TokenBucketLimiter } from './tokenBucketLimiter'

export function buildMiddleware(tokenBucketLimiter:TokenBucketLimiter){
  function middleware(res: Request, req: Response, next: NextFunction){

    // is request rate-limited?
    if(!tokenBucketLimiter.requestConsumeTokens(25)){
      //console.log('THROTTLED')
      req.status(429).send('🙅🏼‍♂️ DENIED!!! 🙅🏼‍♂️');
      return
    }
    //console.log('NOT THROTTLED')

    // continue
    next()
  }

  return middleware;
}
