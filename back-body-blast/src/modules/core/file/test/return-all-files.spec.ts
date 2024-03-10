import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FileEntity } from '../entity/file.entity';
import { BaseFileService } from '../base-file.service';
import { AppPagination } from '../../../../utils/app-pagination.util';

describe('BaseFileService', () => {
  let service: BaseFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseFileService,
        {
          provide: getRepositoryToken(FileEntity),
          useValue: {
            create: jest.fn(() => FileEntity),
            save: jest.fn(() => FileEntity),
            findAndCount: jest.fn(() => [[], 0]),
          },
        },
      ],
    }).compile();

    service = module.get<BaseFileService>(BaseFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('should return all files', async () => {
      const result = await service.findAll(new AppPagination.Request());
      for (const file of result.data) {
        expect(file).not.toBeNull();
        expect(file).toBe(FileEntity);
      }
    });
  });
});
