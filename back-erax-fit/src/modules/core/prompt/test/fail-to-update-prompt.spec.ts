import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptEntity } from '../entity/prompt.entity';
import { BasePromptService } from '../base-prompt.service';
import { FileEntity } from '../../file/entity/file.entity';
import { CreatePromptRequest } from '../dto/create-prompt.dto';
import { UpdatePromptRequest } from '../dto/update-prompt.dto';

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

  describe('update method', () => {
    it('should not update existing prompt record because of wrong data', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptRequest = {
        type: '',
      };

      await expect(service.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('should not update existing prompt record because of wrong data', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptRequest = {
        type: 'new test type',
        photoLink: '',
      };

      await expect(service.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('should not update existing prompt record because of wrong data', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptRequest = {
        type: 'new test type',
        videoLink: '',
      };

      await expect(service.update(savedData.id, updateRequest)).rejects.toThrow();
    });
  });

  describe('update method', () => {
    it('should not update existing prompt record because of wrong id', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      const updateRequest: UpdatePromptRequest = {
        type: 'new test type',
      };

      await expect(service.update(savedData.id + 5, updateRequest)).rejects.toThrow();
    });
  });
});
