import { Test, TestingModule } from '@nestjs/testing';
import { AdminBonusVideoService } from '../admin-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
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
            create: jest.fn(() => BonusVideoEntity),
            save: jest.fn(() => BonusVideoEntity),
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

  describe('findOne method', () => {
    it("shouldn't find video because of incorrect id and should throw 404", async () => {
      const createVideoRequest: CreateVideoByAdminRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedData = await repository.save(await repository.create(createVideoRequest));
      await expect(service.findOne(savedData.id + 5)).rejects.toThrow();
    });
  });
});
