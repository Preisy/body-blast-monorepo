import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequest } from './dto/create-user.dto';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { MainException } from '../../../exceptions/main.exception';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequest } from './dto/update-user.dto';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BaseUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(request: CreateUserRequest): Promise<AppSingleResponse<UserEntity>> {
    await this.checkEmailForExistAndThrowErrorIfExist(request.email);

    const savedUser = await this.userRepository.save(
      this.userRepository.create({
        ...request,
        canWatchVideo: false,
        password: await bcrypt.hash(request.password, await bcrypt.genSalt(10)),
      }),
    );
    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new AppSingleResponse(savedUser);
  }

  async getUsers(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<UserEntity>,
  ): Promise<AppPagination.Response<UserEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.userRepository);
    return getPaginatedData(query, options);
  }

  async getUserById(id: UserEntity['id']): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw MainException.entityNotFound(`User with email ${id} not found`);

    return new AppSingleResponse(user);
  }

  async getUserByEmail(email: UserEntity['email']): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) throw MainException.entityNotFound(`User with email ${email} not found`);

    return new AppSingleResponse(user);
  }

  async updateUser(id: UserEntity['id'], request: UpdateUserRequest) {
    const { data: user } = await this.getUserById(id);

    if (request.password) request.password = await bcrypt.hash(request.password, await bcrypt.genSalt(10));
    const savedUser = await this.userRepository.save({
      ...user,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedUser);
  }

  async deleteUserById(id: number): Promise<AppStatusResponse> {
    const { affected } = await this.userRepository.softDelete(id);
    return new AppStatusResponse(!!affected);
  }

  async checkEmailForExistAndThrowErrorIfExist(email: string) {
    if (
      await this.userRepository.findOne({
        where: {
          email: email,
        },
      })
    )
      throw MainException.invalidData(`User with email ${email} already exist`);
  }
}
