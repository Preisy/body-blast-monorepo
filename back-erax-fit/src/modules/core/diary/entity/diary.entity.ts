import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { DiaryPropsEntity } from '../diary-props/entity/diary-props.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('diaries')
export class DiaryEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public behaviour: string;

  @ApiProperty()
  @Column()
  public date: Date;

  @ApiProperty({ nullable: true })
  @Column({ type: 'integer' })
  public sum?: number;

  @ApiProperty({ nullable: true })
  @Column({ type: 'varchar', length: 250 })
  public activity?: string;

  @ApiProperty({ nullable: true })
  @Column({ type: 'integer' })
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
