import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { BaseUserService } from '../../core/user/base-user.service';
import { CreateUserByClientRequest } from './dto/create-client-user.dto';
import { UpdateUserByClientRequest } from './dto/update-client-user.dto';
import { UserEntity } from '../../core/user/entities/user.entity';
import { Injectable } from '@nestjs/common/decorators';
import { BaseAnthropometrcisService } from '../../../modules/core/anthropometrics/base-anthropometrics.service';
import { GetNotificationForClientResponse } from './dto/get-notification-for-client.dto';
import { BaseDiaryService } from '../../../modules/core/diary/base-diary.service';

@Injectable()
export class MeService {
  constructor(
    private readonly baseService: BaseUserService,
    private readonly anthrpService: BaseAnthropometrcisService,
    private readonly diaryService: BaseDiaryService,
  ) {}

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

  async getNotification(id: UserEntity['id']) {
    const anthrp = await this.anthrpService.findLatestEmptyAnthropometrics(id);
    const diary = await this.diaryService.findLatestEmptyDiary(id);
    const response: GetNotificationForClientResponse = {
      anthropometrics: anthrp,
      diary: diary,
    };
    return new AppSingleResponse(response);
  }

  async updateUser(id: UserEntity['id'], request: UpdateUserByClientRequest) {
    return this.baseService.updateUser(id, request);
  }
}
