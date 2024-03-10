import { Test, TestingModule } from '@nestjs/testing';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { PromptEntity } from '../entity/prompt.entity';
import { BasePromptService } from '../base-prompt.service';
import { FileEntity } from '../../file/entity/file.entity';
import { CreatePromptRequest } from '../dto/create-prompt.dto';
import { GetPromptsByAdminRequest } from '../../../admin/prompt/dto/admin-get-prompts.dto';

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
            findOne: jest.fn(() => PromptEntity),
            delete: jest.fn(() => AppStatusResponse),
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
      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

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

      const result = await service.findAll(query, getRequest);

      for (const food of result.data) {
        expect(food).not.toBeNull();
        expect(food).toBe(PromptEntity);
      }
    });
  });

  describe('delete method', () => {
    it('should delete a workout record by its ID', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const affected = await service.deleteOne(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
