import { ApiProperty } from '@nestjs/swagger';
import { Entity, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { TemplatePropsEntity } from '../../template-props/entity/template-props.entity';

@Entity('diary-templates')
export class DiaryTemplateEntity extends AppBaseEntity {
  @ApiProperty({ type: () => TemplatePropsEntity })
  @OneToMany(() => TemplatePropsEntity, (props) => props.template, { cascade: true })
  public props: TemplatePropsEntity[];
}
