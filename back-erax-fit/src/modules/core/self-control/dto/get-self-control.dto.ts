import { ApiProperty } from '@nestjs/swagger';
import { SelfControlEntity } from '../entity/self-control.entity';

export class GetSelfControlDTO extends SelfControlEntity {
  @ApiProperty()
  public localeDate: string;
}
