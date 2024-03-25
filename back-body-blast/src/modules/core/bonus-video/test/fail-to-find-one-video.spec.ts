import { Test, TestingModule } from '@nestjs/testing';
import { BaseBonusVideoService } from '../base-bonus-video.service';
import { BonusVideoEntity } from '../entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
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
            findOne: jest.fn(() => BonusVideoEntity),
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

  describe('findOne method', () => {
    it("shouldn't find video because of incorrect id and should throw 404", async () => {
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedData = await repository.save(await repository.create(createVideoRequest));
      await expect(service.findOne(savedData.id + 5)).resolves.toBeNull;
    });
  });
});
