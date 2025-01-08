import { Request, Response } from 'express'
import UrlModel from '../database/schemas/url.schema'

export const redirectMiddleware = async (req: Request, res: Response) => {
  try {
    const savedUrl = await UrlModel.findOne({ shortUrl: req.params.shortUrl })

    if (!savedUrl)
      return res.status(404).json({ message: 'Short URL not found' })

    if (
      savedUrl.expiresAt &&
      new Date().getTime() > new Date(savedUrl.expiresAt).getTime()
    ) {
      return res.status(410).json({ message: 'Short URL has expired' })
    }

    const forwarded = req.headers['x-forwarded-for'] as string
    const clientIp = forwarded ? forwarded.split(',')[0] : req.ip

    await UrlModel.updateOne(
      { originalUrl: savedUrl.originalUrl },
      {
        $inc: { clickCount: 1 },
        $push: {
          analitycs: {
            date: new Date(),
            clientIp,
          },
        },
      }
    )

    return res.redirect(savedUrl.originalUrl)
  } catch (error) {
    res.status(500).json({ message: (error as Error).message })
  }
}
