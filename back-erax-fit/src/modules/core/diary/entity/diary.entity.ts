import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { DiaryPropsEntity } from './diary-props.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('diaries')
export class DiaryEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  public cycle?: number;

  @ApiProperty()
  @Column()
  public date: Date;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  public sum?: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250, nullable: true })
  public activity?: string;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  public steps?: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column('integer', { name: 'userId' })
  public userId!: number;

  @ApiProperty({ type: () => DiaryPropsEntity })
  @OneToMany(() => DiaryPropsEntity, (props) => props.diary, { cascade: true })
  public props: DiaryPropsEntity[];
}
