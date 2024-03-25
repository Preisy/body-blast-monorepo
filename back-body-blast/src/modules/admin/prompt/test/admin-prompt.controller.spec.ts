import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { AdminPromptController } from '../admin-prompt.controller';
import { PromptEntity } from '../../../../modules/core/prompt/entity/prompt.entity';
import { BasePromptService } from '../../../../modules/core/prompt/base-prompt.service';
import { AdminPromptService } from '../admin-prompt.service';
import { CreatePromptByAdminRequest } from '../dto/admin-create-prompt.dto';
import { GetPromptsByAdminRequest } from '../dto/admin-get-prompts.dto';
import { FileEntity } from '../../../../modules/core/file/entity/file.entity';

describe('AdminPromptController', () => {
  let controller: AdminPromptController;
  let repository: Repository<PromptEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminPromptController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
        BasePromptService,
        AdminPromptService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PromptEntity),
          useValue: {
            save: jest.fn(() => PromptEntity),
            create: jest.fn(() => PromptEntity),
            findOne: jest.fn(() => PromptEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FileEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<AdminPromptController>(AdminPromptController);
    repository = module.get<Repository<PromptEntity>>(getRepositoryToken(PromptEntity));
  });

  describe('getAll method', () => {
    it('it should return paginated prompt records', async () => {
      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      for (let i = 0; i < 4; i++) {
        await repository.save(await repository.create(request));
      }

      const getRequest: GetPromptsByAdminRequest = {
        type: 'test type',
      };

      const result = await controller.getAll(getRequest, query);

      for (const food of result.data) {
        expect(food).not.toBeNull();
        expect(food).toBe(PromptEntity);
      }
    });
  });

  describe('delete method', () => {
    it('should delete a workout record by its ID', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const affected = await controller.deleteOne(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
