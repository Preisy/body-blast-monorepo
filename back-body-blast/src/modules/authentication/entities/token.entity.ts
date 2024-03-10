import { ApiProperty } from '@nestjs/swagger';
import { AppBaseEntity } from '../../../models/app-base-entity.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';

@Entity('tokens')
export class TokenEntity extends AppBaseEntity {
  @ApiProperty({ type: () => UserEntity })
  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  public user?: UserEntity;

  @ApiProperty()
  @Column({ name: 'userId', nullable: true })
  public userId?: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 256 })
  public hash: string;

  @ApiProperty()
  @Column({
    type: 'varchar',
    length: 256,
  })
  public refreshHash: string;
}
