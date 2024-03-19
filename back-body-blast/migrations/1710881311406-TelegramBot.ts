import { MigrationInterface, QueryRunner } from 'typeorm';

export class TelegramBot1710881311406 implements MigrationInterface {
  name = 'TelegramBot1710881311406';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "telegram" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "chatId" integer, CONSTRAINT "PK_2db8c5fd44d5a77259aadc814b6" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "telegram"');
  }
}
