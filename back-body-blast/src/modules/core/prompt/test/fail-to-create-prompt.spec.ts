import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptEntity } from '../entity/prompt.entity';
import { BasePromptService } from '../base-prompt.service';
import { FileEntity } from '../../file/entity/file.entity';
import { CreatePromptRequest } from '../dto/create-prompt.dto';

describe('BasePromptService', () => {
  let service: BasePromptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BasePromptService,
        {
          provide: getRepositoryToken(PromptEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(FileEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BasePromptService>(BasePromptService);
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptRequest = {
        type: '',
        photoLink: 'biceps.png',
        videoLink: 'undefined/training.mp4',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: '',
        videoLink: 'undefined/training.mp4',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: 'triceps.png',
        videoLink: '',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });

  describe('create method', () => {
    it('should not create a new prompt record because of wrong data', async () => {
      const request: CreatePromptRequest = {
        type: '',
        photoLink: '',
        videoLink: '',
      };

      await expect(service.create(request)).rejects.toThrow();
    });
  });
});
