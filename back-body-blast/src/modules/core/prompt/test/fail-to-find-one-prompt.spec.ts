import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PromptEntity } from '../entity/prompt.entity';
import { BasePromptService } from '../base-prompt.service';
import { FileEntity } from '../../file/entity/file.entity';
import { CreatePromptRequest } from '../dto/create-prompt.dto';

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

  describe('delete method', () => {
    it('should not find one prompt record because of wrong id', async () => {
      const request: CreatePromptRequest = {
        type: 'test type',
        photoLink: 'becips.png',
        videoLink: 'undefined/training.mp4',
      };

      const savedData = await repository.save(await repository.create(request));

      await expect(service.findOne(savedData.id + 5)).rejects.toThrow();
    });
  });
});
