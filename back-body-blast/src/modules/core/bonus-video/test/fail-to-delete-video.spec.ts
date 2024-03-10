import { Test, TestingModule } from '@nestjs/testing';
import { BaseBonusVideoService } from '../base-bonus-video.service';
import { BonusVideoEntity } from '../entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { Repository } from 'typeorm';
import { CreateVideoRequest } from '../dto/create-video.dto';

describe('BaseBonusVideoService', () => {
  let service: BaseBonusVideoService;
  let repository: Repository<BonusVideoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useValue: {
            create: jest.fn(() => BonusVideoEntity),
            save: jest.fn(() => BonusVideoEntity),
            delete: jest.fn(() => AppStatusResponse),
          },
        },
      ],
    }).compile();

    service = module.get<BaseBonusVideoService>(BaseBonusVideoService);
    repository = module.get<Repository<BonusVideoEntity>>(getRepositoryToken(BonusVideoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete', () => {
    it('should not delete bonus video because of incorrect id', async () => {
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedData = await repository.save(await repository.create(createVideoRequest));
      await expect(service.delete(savedData.id + 5)).resolves.not;
    });
  });
});
