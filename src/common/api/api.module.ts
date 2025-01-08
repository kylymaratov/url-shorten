import { Express } from 'express'
import connectDb from '../database/connect'
import apiEnv from './api.options'
import { redirectMiddleware } from './api.redirect'

const beforeStart = async () => {
  await connectDb()
}

const afterStart = (PORT: number) => {
  console.info(`Api started on port: ${PORT}`)
}

const startApi = async (app: Express, PORT: number = 5000) => {
  await beforeStart()

  app.get('/', (req, res) => res.sendFile(apiEnv.staticPath + '/index.html'))
  app.get('/:shortUrl', (req, res) => {
    redirectMiddleware(req, res)
  })

  app.listen(PORT, () => afterStart(PORT))
}

export default startApi
