import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { NutritionEntity } from './nutrition.entity';

@Entity('meal-items')
export class MealItemEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'integer' })
  public category: number;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public type: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 50 })
  public quantity: string;

  @ApiProperty({ type: () => NutritionEntity })
  @ManyToOne(() => NutritionEntity, (nutrition) => nutrition.mealItems, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'nutritionId' })
  public nutrition!: NutritionEntity;

  @ApiProperty()
  @Column({ name: 'nutritionId' })
  public nutritionId!: string;
}
