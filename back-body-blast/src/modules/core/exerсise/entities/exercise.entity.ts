import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WorkoutEntity } from '../../../workout/entity/workout.entity';

@Entity('exercises')
export class ExerciseEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 100 })
  public name: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250, nullable: true })
  public trainerComment?: string;

  @ApiProperty()
  @Column({ type: 'float' })
  public weight: number;

  @ApiProperty()
  @Column({ type: 'integer' })
  public sets: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public repetitions: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  public restTime: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public pace: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250 })
  public photoLink: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250 })
  public videoLink: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 255 })
  public promptType: string;

  @ApiProperty({ type: () => WorkoutEntity })
  @ManyToOne(() => WorkoutEntity, (workout) => workout.exercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workoutId' })
  public workout!: WorkoutEntity;

  @ApiProperty()
  @Column({ name: 'workoutId' })
  public workoutId!: string;
}
