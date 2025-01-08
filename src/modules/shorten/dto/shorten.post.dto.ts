import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator'

export class ShortenUrlDto {
  @IsNotEmpty()
  @IsUrl({ protocols: ['https', 'wss'] })
  originalUrl: string = ''

  @IsOptional()
  @IsString()
  @Length(1, 20, { message: 'Alias must be between 1 and 20 characters long.' })
  alias?: string

  @IsOptional()
  @IsDate({ message: 'expiresAt must be a valid date.' })
  expiresAt?: Date
}
