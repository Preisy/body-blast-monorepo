import { Test, TestingModule } from '@nestjs/testing';
import { BaseBonusVideoService } from '../base-bonus-video.service';
import { BonusVideoEntity } from '../entities/bonus-video.entity';
import { CreateVideoRequest } from '../dto/create-video.dto';
import { AppSingleResponse } from '../../../../dto/app-single-response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';
import { AppPagination } from '../../../../utils/app-pagination.util';

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
            save: jest.fn(() => BonusVideoEntity),
            create: jest.fn(() => BonusVideoEntity),
            findOne: jest.fn(() => BonusVideoEntity),
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(() => [[], 0]),
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

  describe('create', () => {
    it('should create a new bonus video', async () => {
      const createVideoRequest: CreateVideoRequest = {
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
    it('should return an AppPagination Response with array of video entity', async () => {
      const query: AppPagination.Request = {
        page: 1,
        limit: 10,
      };
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };
      for (let i = 0; i < 5; i++) {
        await repository.save(await repository.create(createVideoRequest));
      }
      const result = await service.findAll(query);

      for (const video of result.data) {
        expect(video).toBe(BonusVideoEntity);
        expect(video.linkUrl).toBe('undefined/porn.mp4');
      }
    });
  });

  describe('findOne', () => {
    it('should find a bonus video by id', async () => {
      const createVideoRequest: CreateVideoRequest = {
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
      const createVideoRequest: CreateVideoRequest = {
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
