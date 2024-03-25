import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { AuthService } from '../../../authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../authentication/entities/token.entity';
import { BaseUserService } from '../../../core/user/base-user.service';
import { AdminPromptController } from '../admin-prompt.controller';
import { PromptEntity } from '../../../core/prompt/entity/prompt.entity';
import { BasePromptService } from '../../../core/prompt/base-prompt.service';
import { AdminPromptService } from '../admin-prompt.service';
import { CreatePromptByAdminRequest } from '../dto/admin-create-prompt.dto';
import { FileEntity } from '../../../core/file/entity/file.entity';
import { GetPromptsByAdminRequest } from '../dto/admin-get-prompts.dto';
import { AppPagination } from '../../../../utils/app-pagination.util';

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

      const result = await controller.getAll(getRequest, new AppPagination.Request());

      for (const food of result.data) {
        expect(food).not.toBeNull();
        expect(food).toBe(PromptEntity);
      }
    });
  });
});
