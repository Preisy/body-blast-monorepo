import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExerciseHotfixMigration1715436065354 implements MigrationInterface {
  name = 'ExerciseHotfixMigration1715436065354';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "promptType"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "promptType" character varying(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "promptType"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "promptType" character varying(10) NOT NULL`);
  }
}
