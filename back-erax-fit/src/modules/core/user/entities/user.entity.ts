import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Constants, UserRole } from '../../../../constants/constants';
import { Exclude } from 'class-transformer';
import { TokenEntity } from '../../../authentication/entities/token.entity';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { WorkoutEntity } from '../../workout/entity/workout.entity';

@Entity('users')
export class UserEntity extends AppBaseEntity {
  @OneToMany(() => WorkoutEntity, (workout) => workout.user)
  public workouts: WorkoutEntity[];

  @ApiProperty({ type: () => TokenEntity })
  @OneToOne(() => TokenEntity)
  @JoinColumn({ name: 'tokenId' })
  public token?: TokenEntity;

  @ApiProperty()
  @Column('integer', { name: 'tokenId', nullable: true })
  public tokenId?: number;

  @ApiProperty()
  @Column({ name: 'first_name', type: 'varchar' })
  public firstName!: string;

  @ApiProperty()
  @Column({ name: 'last_name', type: 'varchar' })
  public lastName!: string;

  @Column({
    type: 'varchar',
    name: 'role',
    default: Constants.UserRoleList.default(),
  })
  @ApiProperty()
  public role!: UserRole;

  @ApiProperty()
  @Column({ name: 'email', type: 'varchar', unique: true })
  public email!: string;

  @ApiProperty()
  @Exclude()
  @Column({ name: 'password', type: 'varchar', length: 128 })
  public password!: string;

  @ApiProperty()
  @Column({ type: 'smallint' })
  public age: number;

  @ApiProperty()
  @Column({ type: 'float' })
  public height: number;

  @ApiProperty()
  @Column({ type: 'float' })
  public weight: number;

  @ApiProperty()
  @Column({ type: 'float' })
  public weightInYouth: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public nutritRestrict: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public allergy: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public gastroDeseases: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public mealIntolerance: string;

  @ApiProperty()
  @Column({ type: 'boolean' })
  public insulinResistance: boolean;

  @ApiProperty()
  @Column({ type: 'varchar', length: 128 })
  public kidneyDesease: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public heartDesease: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 128 })
  public muscleDesease: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public loadRestrictions: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 128 })
  public sportsExp: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public goals: string;

  @ApiProperty()
  @Column({ type: 'boolean' })
  public canWatchVideo?: boolean;

  @Column({ type: 'varchar', length: 50 })
  public taskName: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  public taskPeriod: number;
}
