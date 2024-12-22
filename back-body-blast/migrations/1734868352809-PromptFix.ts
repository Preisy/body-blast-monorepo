import { MigrationInterface, QueryRunner } from 'typeorm';

export class PromptFix1734868352809 implements MigrationInterface {
  name = 'PromptFix1734868352809';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "prompts" ALTER COLUMN "photoLink" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "prompts" ALTER COLUMN "videoLink" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "prompts" ALTER COLUMN "videoLink" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "prompts" ALTER COLUMN "photoLink" SET NOT NULL');
  }
}
