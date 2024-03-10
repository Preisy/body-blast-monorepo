import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tokens')
export class TokenEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  public readonly id!: string;

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
