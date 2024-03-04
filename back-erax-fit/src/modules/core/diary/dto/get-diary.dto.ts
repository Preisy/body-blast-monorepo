import { ApiProperty } from '@nestjs/swagger';
import { DiaryEntity } from '../entity/diary.entity';

export class GetDiaryDTO extends DiaryEntity {
  @ApiProperty()
  public localeDate: string;
}
