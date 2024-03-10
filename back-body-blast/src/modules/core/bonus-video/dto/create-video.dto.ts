import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsVideo } from '../../../../decorators/video-type.decorator.dto';

export class CreateVideoRequest {
  @ApiProperty()
  @IsString()
  public name: string;

  @ApiProperty()
  @IsString()
  @IsVideo()
  public linkUrl: string;
}
