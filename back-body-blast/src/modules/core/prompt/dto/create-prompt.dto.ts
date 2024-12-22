import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDefined, IsOptional, IsString, Length } from 'class-validator';
import { IsPhoto } from '../../../../decorators/photo-type.decorator';
import { IsVideo } from '../../../../decorators/video-type.decorator.dto';

export class CreatePromptRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  public type: string;

  @IsDefined()
  @IsString()
  @ApiProperty()
  @Length(1, 255)
  @IsPhoto()
  public photoLink: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  @Length(1, 255)
  @IsVideo()
  public videoLink?: string;
}
