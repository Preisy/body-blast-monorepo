import { ApiProperty } from '@nestjs/swagger';
import { FileEntity } from '../entity/file.entity';

export class CreateFileResponse {
  @ApiProperty()
  public link: string;

  constructor(file: FileEntity) {
    this.link = file.fileLInk;
  }
}
