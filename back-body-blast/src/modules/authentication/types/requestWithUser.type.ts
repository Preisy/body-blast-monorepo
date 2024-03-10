import { Request } from 'express';
import { UserEntity } from '../../core/user/entities/user.entity';

export interface RequestWithUser extends Request {
  user: UserEntity;
}
