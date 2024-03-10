import { Test, TestingModule } from '@nestjs/testing';
import { ClientBonusVideoService } from '../client-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';
import { CreateVideoRequest } from '../../../../modules/core/bonus-video/dto/create-video.dto';

describe('ClientVideoService', () => {
  let service: ClientBonusVideoService;
  let repository: Repository<BonusVideoEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseBonusVideoService,
        ClientBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useValue: {
            save: jest.fn(() => BonusVideoEntity),
            create: jest.fn(() => BonusVideoEntity),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<ClientBonusVideoService>(ClientBonusVideoService);
    repository = module.get<Repository<BonusVideoEntity>>(getRepositoryToken(BonusVideoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('should return an AppPaginationResponse', async () => {
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };
      for (let i = 0; i < 5; i++) {
        await repository.save(await repository.create(createVideoRequest));
      }
      const result = await service.findAll(new AppPagination.Request());

      for (const video of result.data) {
        expect(result.data).not.toBeNull();
        expect(video).toBe(BonusVideoEntity);
        expect(video.linkUrl).toBe('undefined/porn.mp4');
      }
    });
  });
});
