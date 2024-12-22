import { MigrationInterface, QueryRunner } from 'typeorm';

export class PromptFix1734881028311 implements MigrationInterface {
  name = 'PromptFix1734881028311';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "prompts" ALTER COLUMN "videoLink" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('UPDATE "prompts" SET "temp" = "videoLink"::character varying(250)');
    await queryRunner.query('ALTER TABLE "prompts" DROP COLUMN "videoLink"');
    await queryRunner.query('ALTER TABLE "prompts" ALTER COLUMN "temp" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "prompts" RENAME COLUMN "temp" TO "videoLink"');
  }
}
