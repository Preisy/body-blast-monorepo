import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AppBaseEntity } from '../../../models/app-base-entity.entity';
import { ExerciseEntity } from '../../core/exerсise/entities/exercise.entity';
import { UserEntity } from '../../core/user/entities/user.entity';

@Entity('workouts')
export class WorkoutEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250, nullable: true })
  public comment?: string;

  @ApiProperty()
  @Column()
  public date: Date;

  @ApiProperty()
  @Column({ type: 'integer', nullable: true })
  public cycle?: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user!: UserEntity;

  @ApiProperty()
  @Column({ name: 'userId' })
  public userId!: string;

  @OneToMany(() => ExerciseEntity, (exercise) => exercise.workout, { cascade: true })
  public exercises: ExerciseEntity[];
}
