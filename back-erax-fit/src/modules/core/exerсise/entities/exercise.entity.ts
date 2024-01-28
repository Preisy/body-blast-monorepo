import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { WorkoutEntity } from '../../workout/entity/workout.entity';

@Entity('exercises')
export class ExerciseEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public name: string;

  @ApiProperty()
  @Column({ nullable: true })
  public trainerComment?: string;

  @ApiProperty()
  @Column()
  public weight: number;

  @ApiProperty()
  @Column()
  public sets: number;

  @ApiProperty()
  @Column()
  public repetitions: string;

  @ApiProperty()
  @Column()
  public restTime: number;

  @ApiProperty()
  @Column()
  public pace: string;

  @ApiProperty()
  @Column()
  public photoLink: string;

  @ApiProperty()
  @Column()
  public videoLink: string;

  @ApiProperty({ type: () => WorkoutEntity })
  @ManyToOne(() => WorkoutEntity, (workout) => workout.exercises, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'workoutId' })
  public workout!: WorkoutEntity;

  @ApiProperty()
  @Column('integer', { name: 'workoutId' })
  public workoutId!: number;
}
