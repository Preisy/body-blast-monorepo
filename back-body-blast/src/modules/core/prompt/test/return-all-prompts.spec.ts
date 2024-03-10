import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptEntity } from '../../../core/prompt/entity/prompt.entity';
import { BasePromptService } from '../../../core/prompt/base-prompt.service';
import { FileEntity } from '../../../core/file/entity/file.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { CreatePromptRequest } from '../dto/create-prompt.dto';
import { GetPromptsByAdminRequest } from '../../../../modules/admin/prompt/dto/admin-get-prompts.dto';

describe('BasePromptService', () => {
  let service: BasePromptService;
  let repository: Repository<PromptEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasePromptService,
        {
          provide: getRepositoryToken(PromptEntity),
          useValue: {
            save: jest.fn(() => PromptEntity),
            create: jest.fn(() => PromptEntity),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
        {
          provide: getRepositoryToken(FileEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BasePromptService>(BasePromptService);
    repository = module.get<Repository<PromptEntity>>(getRepositoryToken(PromptEntity));
  });

  describe('findAll method', () => {
    it('it should return paginated prompt records', async () => {
      const request: CreatePromptRequest = {
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

      const result = await service.findAll(new AppPagination.Request(), getRequest);

      for (const food of result.data) {
        expect(food).not.toBeNull();
        expect(food).toBe(PromptEntity);
      }
    });
  });
});
