import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../../models/app-base-entity.entity';
import { DiaryEntity } from '../../entity/diary.entity';

@Entity('diary-props')
export class DiaryPropsEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public label: string;

  @ApiProperty()
  @Column({ nullable: true })
  public value?: number;

  @ApiProperty({ type: () => DiaryEntity })
  @ManyToOne(() => DiaryEntity, (diary) => diary.props, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'diaryId' })
  public diary!: DiaryEntity;

  @ApiProperty()
  @Column('integer', { name: 'diaryId' })
  public diaryId!: number;
}