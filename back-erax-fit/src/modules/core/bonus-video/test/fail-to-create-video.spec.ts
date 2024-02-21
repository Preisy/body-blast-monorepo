import { Test, TestingModule } from '@nestjs/testing';
import { BaseBonusVideoService } from '../base-bonus-video.service';
import { BonusVideoEntity } from '../entities/bonus-video.entity';
import { CreateVideoRequest } from '../dto/create-video.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BaseBonusVideoService', () => {
  let service: BaseBonusVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseBonusVideoService>(BaseBonusVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should not create a new bonus video because of invalid url', async () => {
      const invalidVideoRequest: CreateVideoRequest = {
        name: 'incorrect url',
        linkUrl: 'sdfgdhj/dfghjk.gfdsa',
      };
      await expect(service.create(invalidVideoRequest)).rejects.toThrow();
    });
  });
});
