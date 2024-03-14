import { MigrationInterface, QueryRunner } from 'typeorm';

export class PromptTypeFieldInExercise1710430827111 implements MigrationInterface {
  name = 'PromptTypeFieldInExercise1710430827111';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "exercises" ADD "promptType" character varying(10) DEFAULT \'d\'');
    await queryRunner.query('ALTER TABLE "exercises" ALTER COLUMN "promptType" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "exercises" ALTER COLUMN "promptType" SET NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "promptType"');
  }
}
