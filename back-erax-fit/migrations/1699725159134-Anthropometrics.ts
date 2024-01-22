import { MigrationInterface, QueryRunner } from 'typeorm';

export class Antropometrics1699725159134 implements MigrationInterface {
  name = 'Antropometrics1699725159134';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE "anthropometrics" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer NOT NULL, "weight" double precision, "waist" double precision, "abdomen" double precision, "shoulder" double precision, "hip" double precision, "hipVolume" double precision, CONSTRAINT "PK_227358fe517ea3230ab655c3682" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "users" ADD "anthrpJobPeriod" integer');
    await queryRunner.query(
      'ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "anthrpJobPeriod"');
    await queryRunner.query('DROP TABLE "anthropometrics"');
  }
}
