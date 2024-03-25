import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';
import { CreateUserRequest } from './create-user.dto';

export class UpdateUserRequest extends PartialType(CreateUserRequest) {}

export class UpdateUserResponse {
  @ApiProperty({ type: UserEntity })
  public user: UserEntity;

  constructor(user: UserEntity) {
    this.user = user;
  }
}
