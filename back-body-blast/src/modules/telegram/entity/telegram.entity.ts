import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../models/app-base-entity.entity';

@Entity('telegram')
export class TelegramBotEntity extends AppBaseEntity {
  @Column({ type: 'integer', nullable: true })
  public chatId?: number;
}
