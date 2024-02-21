import { Test, TestingModule } from '@nestjs/testing';
import { AdminBonusVideoService } from '../admin-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { CreateVideoByAdminRequest } from '../dto/admin-create-video.dto';
import { AppSingleResponse } from '../../../../dto/app-single-response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { AppPagination } from '../../../../utils/app-pagination.util';

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
            findOne: jest.fn(() => BonusVideoEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
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

  describe('create', () => {
    it('should create a new bonus video', async () => {
      const createVideoRequest: CreateVideoByAdminRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };
      jest.spyOn(repository, 'save').mockResolvedValueOnce(createVideoRequest as BonusVideoEntity);
      const result = await service.create(createVideoRequest);
      expect(result).toBeInstanceOf(AppSingleResponse);
      expect(result.data).toEqual(createVideoRequest);
    });
  });

  describe('findAll method', () => {
    it('should return an AppPaginationResponse', async () => {
      const query: AppPagination.Request = {
        limit: 10,
        page: 1,
      };

      const createVideoRequest: CreateVideoByAdminRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };
      for (let i = 0; i < 5; i++) {
        await repository.save(await repository.create(createVideoRequest));
      }
      const result = await service.findAll(query);

      for (const video of result.data) {
        expect(result.data).not.toBeNull();
        expect(video).toBe(BonusVideoEntity);
        expect(video.linkUrl).toBe('undefined/porn.mp4');
      }
    });
  });

  describe('findOne', () => {
    it('should find a bonus video by id', async () => {
      const createVideoRequest: CreateVideoByAdminRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedData = await repository.save(await repository.create(createVideoRequest));

      const video = await service.findOne(savedData.id);
      expect(video).toBeDefined();
      expect({ data: video.data }).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a bonus video by id', async () => {
      const createVideoRequest: CreateVideoByAdminRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedData = await repository.save(await repository.create(createVideoRequest));
      const affected = await service.delete(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
