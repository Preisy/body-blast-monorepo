import { Injectable } from '@nestjs/common';
import { CreateUserByAdminRequest } from './dto/create-admin.dto';
import { UpdateUserByAdminRequest } from './dto/update-admin-user.dto';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { BaseUserService } from '../../core/user/base-user.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { UserEntity } from '../../core/user/entities/user.entity';

@Injectable()
export class AdminUserService {
  constructor(private readonly baseService: BaseUserService) {}

  async create(request: CreateUserByAdminRequest) {
    const { data: savedUser } = await this.baseService.create(request);

    return new AppSingleResponse(savedUser);
  }

  async getUsers(request: AppPagination.Request) {
    return this.baseService.getUsers(request);
  }

  async getUserByEmail(email: UserEntity['email']) {
    return this.baseService.getUserByEmail(email);
  }

  async getUserById(id: UserEntity['id']) {
    return this.baseService.getUserById(id);
  }

  async updateUser(id: UserEntity['id'], request: UpdateUserByAdminRequest) {
    return this.baseService.updateUser(id, request);
  }

  async deleteUserById(id: UserEntity['id']) {
    return this.baseService.deleteUserById(id);
  }
}
