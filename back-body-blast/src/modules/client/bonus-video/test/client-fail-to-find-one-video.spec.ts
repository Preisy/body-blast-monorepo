import { Test, TestingModule } from '@nestjs/testing';
import { ClientBonusVideoService } from '../client-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';
import { CreateVideoRequest } from '../../../core/bonus-video/dto/create-video.dto';
import { ClientBonusVideoController } from '../client-bonus-video.controller';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';
import { TokenEntity } from '../../../../modules/authentication/entities/token.entity';
import { BaseUserService } from '../../../../modules/core/user/base-user.service';
import { AuthService } from '../../../../modules/authentication/auth.service';
import { JwtService } from '@nestjs/jwt';
import { RequestWithUser } from '../../../../modules/authentication/types/requestWithUser.type';

describe('ClientVideoService/Controller', () => {
  let service: ClientBonusVideoService;
  let repository: Repository<BonusVideoEntity>;
  let controller: ClientBonusVideoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientBonusVideoController],
      providers: [
        BaseBonusVideoService,
        BaseUserService,
        AuthService,
        JwtService,
        ClientBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useValue: {
            save: jest.fn(() => BonusVideoEntity),
            create: jest.fn(() => BonusVideoEntity),
          },
        },
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(TokenEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ClientBonusVideoService>(ClientBonusVideoService);
    repository = module.get<Repository<BonusVideoEntity>>(getRepositoryToken(BonusVideoEntity));
    controller = module.get<ClientBonusVideoController>(ClientBonusVideoController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne method', () => {
    it('should not return any video because of wrong id', async () => {
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedVideo = await repository.save(await repository.create(createVideoRequest));

      await expect(service.findOne(savedVideo.id + 5)).rejects.toThrow();
    });
  });

  describe('getOne method', () => {
    it('should not return any video because of wrong id', async () => {
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };

      const savedVideo = await repository.save(await repository.create(createVideoRequest));

      const requestWithUser = {} as RequestWithUser;

      await expect(controller.getOne(requestWithUser, savedVideo.id + 5)).rejects.toThrow();
    });
  });
});
