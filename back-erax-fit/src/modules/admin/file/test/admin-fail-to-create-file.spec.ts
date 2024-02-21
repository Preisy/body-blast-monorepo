import { Test, TestingModule } from '@nestjs/testing';
import { AdminFileController } from '../admin-file.controller';
import { AdminFileService } from '../admin-file.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import { BaseUserService } from '../../../core/user/base-user.service';
import { AuthService } from '../../../authentication/auth.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileEntity } from '../../../core/file/entity/file.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { TokenEntity } from '../../../authentication/entities/token.entity';
import { BaseFileService } from '../../../core/file/base-file.service';
import { UserEntity } from '../../../core/user/entities/user.entity';

describe('AdminFileController', () => {
  let controller: AdminFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminFileController],
      providers: [
        AdminFileService,
        BaseUserService,
        BaseFileService,
        AuthService,
        {
          provide: getRepositoryToken(FileEntity),
          useClass: Repository,
        },
        JwtService,
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

    controller = module.get<AdminFileController>(AdminFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should not create a new file', async () => {
      const file: Express.Multer.File = {
        fieldname: 'dfghj',
        originalname: 'dfghj',
        mimetype: 'video',
        size: 150,
        stream: new Readable(),
        destination: 'sdfghj',
        filename: 'yeah',
        path: 'undefined/file.txt',
        buffer: new Buffer('yeah', undefined),
        encoding: '256',
      };
      await expect(controller.create(file)).rejects.toThrow();
    });
  });
});
