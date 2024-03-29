import { Test, TestingModule } from '@nestjs/testing';
import { ClientBonusVideoService } from '../client-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';
import { CreateVideoRequest } from '../../../core/bonus-video/dto/create-video.dto';

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
            findOne: jest.fn(() => BonusVideoEntity),
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
    it('should return a single video record', async () => {
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedVideo = await repository.save(await repository.create(createVideoRequest));

      const video = await service.findOne(savedVideo.id);
      expect(video).toBeDefined();
      expect({ data: video.data }).toBeDefined();
    });
  });
});
