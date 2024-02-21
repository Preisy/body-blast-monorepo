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
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { AdminBonusVideoController } from '../admin-bonus-video.controller';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';

describe('AdminBonusVideoController', () => {
  let service: AdminBonusVideoService;
  let repository: Repository<BonusVideoEntity>;
  let controller: AdminBonusVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminBonusVideoController],
      providers: [
        BaseUserService,
        AuthService,
        JwtService,
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
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminBonusVideoService>(AdminBonusVideoService);
    controller = module.get<AdminBonusVideoController>(AdminBonusVideoController);
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
      const result = await controller.create(createVideoRequest);
      expect(result).toBeInstanceOf(AppSingleResponse);
      expect(result.data).toEqual(createVideoRequest);
    });
  });

  describe('getAll method', () => {
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
      const result = await controller.getAll(query);

      for (const video of result.data) {
        expect(result.data).not.toBeNull();
        expect(video).toBe(BonusVideoEntity);
        expect(video.linkUrl).toBe('undefined/porn.mp4');
      }
    });
  });

  describe('getOne', () => {
    it('should find a bonus video by id', async () => {
      const createVideoRequest: CreateVideoByAdminRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedData = await repository.save(await repository.create(createVideoRequest));

      const video = await controller.getOne(savedData.id);
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
      const affected = await controller.delete(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
