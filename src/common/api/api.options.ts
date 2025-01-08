import path from 'path'
import { config } from 'dotenv'

config()

interface ApiEnv {
  env: NodeJS.ProcessEnv
  staticPath: string
  protocol: 'http' | 'https'
}

const apiEnv: ApiEnv = {
  env: process.env,
  staticPath: path.join(__dirname, '../../../', 'public'),
  protocol: process.env.NODE_ENV === 'development' ? 'http' : 'https',
}

export default apiEnv
