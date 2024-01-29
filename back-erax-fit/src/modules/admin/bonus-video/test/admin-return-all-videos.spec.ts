import { Test, TestingModule } from '@nestjs/testing';
import { AdminBonusVideoService } from '../admin-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';
import { CreateVideoByAdminRequest } from '../dto/admin-create-video.dto';

describe('AdminBonusVideoService', () => {
  let service: AdminBonusVideoService;
  let repository: Repository<BonusVideoEntity>;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseBonusVideoService,
        AdminBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useValue: {
            save: jest.fn(() => BonusVideoEntity),
            create: jest.fn(() => BonusVideoEntity),
            findAndCount: jest.fn(() => Promise<[BonusVideoEntity[], number]>),
          },
        },
      ],
    }).compile();

    service = module.get<AdminBonusVideoService>(AdminBonusVideoService);
    repository = module.get<Repository<BonusVideoEntity>>(getRepositoryToken(BonusVideoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('should return an AppPaginationResponse', async () => {
      const createVideoRequest: CreateVideoByAdminRequest = {
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
