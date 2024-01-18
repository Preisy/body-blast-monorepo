import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { Column, Entity } from 'typeorm';

@Entity('video')
export class BonusVideoEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250 })
  public linkUrl: string;
}
