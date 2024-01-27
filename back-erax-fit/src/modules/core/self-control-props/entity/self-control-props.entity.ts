import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';
import { SelfControlEntity } from '../../self-control/entity/self-control.entity';

@Entity('self-control-props')
export class SelfControlPropsEntity extends AppBaseEntity {
  @ApiProperty()
  @Column()
  public label: string;

  @ApiProperty()
  @Column({ nullable: true })
  public value?: number;

  @ApiProperty({ type: () => SelfControlEntity })
  @ManyToOne(() => SelfControlEntity, (selfControl) => selfControl.props, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'selfControlId' })
  public selfControl!: SelfControlEntity;

  @ApiProperty()
  @Column('integer', { name: 'selfControlId' })
  public selfControlId!: number;
}
