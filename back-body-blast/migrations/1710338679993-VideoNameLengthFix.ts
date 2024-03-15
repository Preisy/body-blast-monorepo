import { MigrationInterface, QueryRunner } from 'typeorm';

export class VideoNameLengthFix1710338679993 implements MigrationInterface {
  name = 'VideoNameLengthFix1710338679993';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "files" DROP COLUMN "fileName"');
    await queryRunner.query('ALTER TABLE "files" ADD "fileName" character varying(500) NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "files" DROP COLUMN "fileName"');
    await queryRunner.query('ALTER TABLE "files" ADD "fileName" character varying(50) NOT NULL');
  }
}
