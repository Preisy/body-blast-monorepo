import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';

@Entity('prompts')
export class PromptEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public type: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250 })
  public photoLink: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250, nullable: true })
  public videoLink?: string;
}
