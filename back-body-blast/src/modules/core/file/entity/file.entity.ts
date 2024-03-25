import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { AppBaseEntity } from '../../../../models/app-base-entity.entity';

@Entity('files')
export class FileEntity extends AppBaseEntity {
  @ApiProperty()
  @Column({ type: 'varchar', length: 500 })
  public fileName: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250 })
  public path: string;

  @ApiProperty()
  @Column({ type: 'varchar', length: 250 })
  public fileLInk: string;
}
