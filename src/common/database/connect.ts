import mongoose from 'mongoose'
import apiEnv from '../api/api.options'

const connectDb = async () => {
  return await mongoose.connect(apiEnv.env.MONGODB_URL || '')
}

export default connectDb
