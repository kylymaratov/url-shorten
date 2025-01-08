import { model, Schema } from 'mongoose'

const UrlSchema = new Schema(
  {
    originalUrl: { type: String, unique: true, required: true },
    shortUrl: { type: String, required: true },
    alias: { type: String, default: null },
    expiresAt: { type: Date, default: null },
    analitycs: { type: Array, default: [] },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
)

const UrlModel = model('urls', UrlSchema)

export default UrlModel
