import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';

@Entity('food')
export class FoodEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('varchar')
  public type: string;

  @ApiProperty()
  @Column('integer')
  public category: number;

  @ApiProperty()
  @Column('varchar')
  public name: string;
}
