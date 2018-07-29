// @flow

import compression from 'compression'
import express from 'express'
import path from 'path'

import { STATIC_PATH, WEB_PORT, isProd } from '../shared/config'

const app = express()
const filePath = './dist/index.html'
const resolvedPath = path.resolve(filePath)

app.use(compression())
app.use(STATIC_PATH, express.static('dist'))
app.use(STATIC_PATH, express.static('data'))

app.get('/', (req, res) => {
  res.sendFile(resolvedPath)
})

app.listen(WEB_PORT, () => {
  console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)' : '(development)'}.`)
})
