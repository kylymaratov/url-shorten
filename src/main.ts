import './alias'
import 'reflect-metadata'

import express from 'express'
import path from 'path'

import startApi from './common/api/api.module'
import { useExpressServer } from 'routing-controllers'
import apiEnv from './common/api/api.options'

async function bootstrap() {
  try {
    const app = useExpressServer(express(), {
      routePrefix: '/api',
      validation: true,
      controllers: [path.join(__dirname, './modules/**/*.controller.{ts,js}')],
      cors: true,
      classTransformer: true,
      middlewares: [express.json(), express.static(apiEnv.staticPath)],
      development: apiEnv.env.NODE_ENV === 'development',
      defaultErrorHandler: true,
    })

    await startApi(app)
  } catch (error) {
    console.error(`Failed start server: ${error}`)
  }
}

bootstrap()
