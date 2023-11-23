import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity('antropometrics')
export class AntropometricsEntity extends AppBaseEntity {
  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column('integer', { name: 'userId' })
  public userId!: number;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  public weight?: number;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  public waist?: number;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  public abdomen?: number;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  public shoulder?: number;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  public hip?: number;

  @ApiProperty()
  @Column({ type: 'float', nullable: true })
  public hipVolume?: number;
}