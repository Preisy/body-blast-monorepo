import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiaryEntity } from '../entity/diary.entity';
import { IsNumber } from 'class-validator';

export class GetDiaryDTO extends DiaryEntity {
  @ApiProperty()
  public localeDate: string;
}

export class GetLatestEmptyDiaryResponse {
  @ApiPropertyOptional()
  @IsNumber()
  id: number;

  @ApiPropertyOptional()
  @IsNumber()
  userId: number;

  @ApiPropertyOptional()
  createdAt: Date;
}
