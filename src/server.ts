import { TokenBucketLimiter } from "./lib/tokenBucketLimiter"

const express = require('express')
const app = express()

const PORT = process.env['PORT'] || 3000

const rateLimiter = new TokenBucketLimiter(50,25)

app.use( (res: any, req: any, next: any)=> {
  // is request rate-limited?
  if(!rateLimiter.requestConsumeTokens(25)){
    console.log('THROTTLED')
    req.status(429).send('🙅🏼‍♂️ DENIED!!! 🙅🏼‍♂️');
    return
  }
  console.log('NOT THROTTLED')

  // continue
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})