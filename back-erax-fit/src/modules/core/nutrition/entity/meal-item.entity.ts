import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { NutritionEntity } from './nutrition.entity';

@Entity('meal-items')
export class MealItemEntity extends AppBaseEntity {
  @ApiProperty()
  @Column('integer')
  public category: number;

  @ApiProperty()
  @Column('varchar')
  public type: string;

  @ApiProperty()
  @Column('varchar')
  public quantity: string;

  @ApiProperty({ type: () => NutritionEntity })
  @ManyToOne(() => NutritionEntity, (nutrition) => nutrition.mealItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nutritionId' })
  public nutrition!: NutritionEntity;

  @ApiProperty()
  @Column('integer', { name: 'nutritionId' })
  public nutritionId!: number;
}
