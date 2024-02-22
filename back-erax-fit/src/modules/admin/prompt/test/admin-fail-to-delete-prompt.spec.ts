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

  describe('delete method', () => {
    it('should not delete one prompt record because of wrong id', async () => {
      const request: CreatePromptByAdminRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      await expect(controller.deleteOne(savedData.id + 5)).rejects.toThrow();
    });
  });
});
