import { MigrationInterface, QueryRunner } from 'typeorm';

export class TrainingFix1700756277380 implements MigrationInterface {
  name = 'TrainingFix1700756277380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "exercises" ADD "temp" character varying(50)');
    await queryRunner.query('UPDATE "exercises" SET "temp" = "repetitions"::character varying(50)');
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "repetitions"');
    await queryRunner.query('ALTER TABLE "exercises" ALTER COLUMN "temp" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "exercises" RENAME COLUMN "temp" TO "repetitions"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "exercises" RENAME COLUMN "repetitions" TO "temp"');
    await queryRunner.query('ALTER TABLE "exercises" ADD "repetitions" integer');
    await queryRunner.query('UPDATE "exercises" SET "repetitions" = "temp"::integer');
    await queryRunner.query('ALTER TABLE "exercises" ALTER COLUMN "repetitions" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "temp"');
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }
}
