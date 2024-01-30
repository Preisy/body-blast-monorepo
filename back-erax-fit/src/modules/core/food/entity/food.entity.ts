import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';

@Entity('food')
export class FoodEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public type: string;

  @ApiProperty()
  @Column({ type: 'integer' })
  public category: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public name: string;
}
