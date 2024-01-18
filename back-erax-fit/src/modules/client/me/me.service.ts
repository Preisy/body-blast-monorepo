import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { BaseUserService } from '../../core/user/base-user.service';
import { CreateUserByClientRequest } from './dto/create-client-user.dto';
import { UpdateUserByClientRequest } from './dto/update-client-user.dto';
import { UserEntity } from '../../core/user/entities/user.entity';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class MeService {
  constructor(private readonly baseService: BaseUserService) {}

  async create(request: CreateUserByClientRequest) {
    const { data: savedUser } = await this.baseService.create(request);

    return new AppSingleResponse(savedUser);
  }

  async getUserByEmail(email: UserEntity['email']) {
    return this.baseService.getUserByEmail(email);
  }

  async getMe(id: UserEntity['id']) {
    return this.baseService.getUserById(id);
  }

  async updateUser(id: UserEntity['id'], request: UpdateUserByClientRequest) {
    return this.baseService.updateUser(id, request);
  }
}
