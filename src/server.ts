import { buildMiddleware } from "./lib/rateLimiterMiddleware"
import { TokenBucketLimiter } from "./lib/tokenBucketLimiter"

const express = require('express')
const app = express()

const PORT = process.env['PORT'] || 3000

const rateLimiter = new TokenBucketLimiter(50,25)
const rateLimiterMiddleware = buildMiddleware(rateLimiter);
app.use(rateLimiterMiddleware)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})