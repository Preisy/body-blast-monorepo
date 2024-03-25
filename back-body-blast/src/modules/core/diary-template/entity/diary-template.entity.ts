import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { DiaryTemplatePropsEntity } from './diary-template-props.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('diary-templates')
export class DiaryTemplateEntity extends AppBaseEntity {
  @ApiProperty({ type: () => DiaryTemplatePropsEntity })
  @OneToMany(() => DiaryTemplatePropsEntity, (props) => props.template, { cascade: true })
  public props: DiaryTemplatePropsEntity[];

  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user?: UserEntity;

  @ApiProperty()
  @Column({ name: 'userId', nullable: false })
  public userId?: string;
}
