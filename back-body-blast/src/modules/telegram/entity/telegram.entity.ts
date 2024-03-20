import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../models/app-base-entity.entity';

@Entity('exception-chat-notifier')
export class ExceptionCHatNotifierEntity extends AppBaseEntity {
  @Column({ type: 'integer', nullable: true })
  public chatId?: number;
}
