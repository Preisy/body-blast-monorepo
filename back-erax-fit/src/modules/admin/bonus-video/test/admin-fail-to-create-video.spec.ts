import { Test, TestingModule } from '@nestjs/testing';
import { AdminBonusVideoService } from '../admin-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { CreateVideoByAdminRequest } from '../dto/admin-create-video.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';

describe('AdminBonusVideoService', () => {
  let service: AdminBonusVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useClass: Repository,
        },
        BaseBonusVideoService,
      ],
    }).compile();

    service = module.get<AdminBonusVideoService>(AdminBonusVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not create a new bonus video because of invalid url', async () => {
      const invalidVideoRequest: CreateVideoByAdminRequest = {
        name: 'incorrect url',
        linkUrl: 'sdfgdhj/dfghjk.gfdsa',
      };
      await expect(service.create(invalidVideoRequest)).rejects.toThrow();
    });
  });
});
