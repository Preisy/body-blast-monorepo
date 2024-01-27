import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { DiaryTemplateEntity } from '../../diary-template/entity/diary-template.entity';

@Entity('template-props')
export class TemplatePropsEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public label: string;

  @ApiProperty({ type: () => DiaryTemplateEntity })
  @ManyToOne(() => DiaryTemplateEntity, (template) => template.props, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'templateId' })
  public template!: DiaryTemplateEntity;

  @ApiProperty()
  @Column('integer', { name: 'templateId' })
  public templateId!: number;
}
