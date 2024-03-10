import { Test, TestingModule } from '@nestjs/testing';
import { Readable } from 'typeorm/platform/PlatformTools';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileEntity } from '../entity/file.entity';
import { Repository } from 'typeorm';
import { BaseFileService } from '../base-file.service';

describe('BaseFileService', () => {
  let service: BaseFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseFileService,
        {
          provide: getRepositoryToken(FileEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseFileService>(BaseFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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
      await expect(service.create(file)).rejects.toThrow();
    });
  });
});
