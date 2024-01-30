import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../../models/app-base-entity.entity';
import { DiaryTemplateEntity } from '../../entity/diary-template.entity';

@Entity('diary-template-props')
export class DiaryTemplatePropsEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public label: string;

  @ApiProperty({ type: () => DiaryTemplateEntity })
  @ManyToOne(() => DiaryTemplateEntity, (template) => template.props, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'templateId' })
  public template!: DiaryTemplateEntity;

  @ApiProperty()
  @Column('integer', { name: 'templateId' })
  public templateId!: number;
}
