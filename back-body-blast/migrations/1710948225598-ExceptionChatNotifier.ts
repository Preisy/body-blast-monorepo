import { MigrationInterface, QueryRunner } from 'typeorm';

export class ExceptionChatNotifier1710948225598 implements MigrationInterface {
  name = 'ExceptionChatNotifier1710948225598';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "exception-chat-notifier" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "chatId" integer, CONSTRAINT "PK_f5bb3488bc33fa5a57f0b3a06ae" PRIMARY KEY ("id"))',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "exception-chat-notifier"');
  }
}
