import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';

@Entity('prompts')
export class PromptEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('varchar')
  public type: string;

  @ApiProperty()
  @Column('varchar')
  public photoLink: string;

  @ApiProperty()
  @Column('varchar')
  public videoLink: string;
}
