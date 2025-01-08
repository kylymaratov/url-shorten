import {
  Body,
  Delete,
  Get,
  HttpError,
  JsonController,
  Params,
  Post,
  Req,
} from 'routing-controllers'
import { ShortenUrlDto } from './dto/shorten.post.dto'
import UrlModel from '@/common/database/schemas/url.schema'
import { Request } from 'express'
import { nanoid } from 'nanoid'
import apiEnv from '@/common/api/api.options'

@JsonController()
export class ShortenController {
  @Post('/shorten')
  async shortenUrl(
    @Req() req: Request,
    @Body({ validate: true }) body: ShortenUrlDto
  ) {
    const { originalUrl, alias, expiresAt } = body

    const savedUrl = await UrlModel.findOne({ originalUrl })

    if (savedUrl) {
      return `${apiEnv.protocol}://${req.get('host')}/${savedUrl.shortUrl}`
    }

    if (alias) {
      const existingAlias = await UrlModel.findOne({ alias })
      if (existingAlias) throw new HttpError(400, 'Alias is already in use')
    }

    const newUrl = await new UrlModel({
      originalUrl,
      shortUrl: alias || nanoid(6),
      alias,
      expiresAt: expiresAt ? new Date(expiresAt) : null,
      analitycs: [],
      clickCount: 0,
    }).save()

    return `${apiEnv.protocol}://${req.get('host')}/${newUrl.shortUrl}`
  }

  @Get('/info/:shortUrl')
  async getUrlInfo(@Params() params: { shortUrl: string }) {
    const savedUrl = await UrlModel.findOne({ shortUrl: params.shortUrl })

    return {
      originalUrl: savedUrl?.originalUrl,
      shortUrl: savedUrl?.shortUrl,
      analitycs: savedUrl?.analitycs,
      clickCount: savedUrl?.clickCount,
      createdAt: savedUrl?.createdAt,
    }
  }

  @Delete('/delete/:shortUrl')
  async deleteUrl(@Params() params: { shortUrl: string }) {
    await UrlModel.deleteOne({ shortUrl: params.shortUrl })

    return { message: 'OK' }
  }
}
