import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExerciseFix1736074146608 implements MigrationInterface {
  name = 'ExerciseFix1736074146608';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "exercises" ALTER COLUMN "videoLink" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE "exercises" SET "temp" = "videoLink"::character varying(250)');
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "videoLink"');
    await queryRunner.query('ALTER TABLE "exercises" ALTER COLUMN "temp" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "exercises" RENAME COLUMN "temp" TO "videoLink"');
  }
}
