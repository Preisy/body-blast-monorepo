import { MigrationInterface, QueryRunner } from 'typeorm';

export class DiaryMigration1706549028538 implements MigrationInterface {
  name = 'DiaryMigration1706549028538';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"`);
    await queryRunner.query(
      `CREATE TABLE "diary-template-props" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "label" character varying NOT NULL, "templateId" integer NOT NULL, CONSTRAINT "PK_094f31bd7de57a8838b99349dc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diary-templates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "REL_5f67fdf2ae7685f78b8733f505" UNIQUE ("userId"), CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diary-props" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "label" character varying NOT NULL, "value" integer, "diaryId" integer NOT NULL, CONSTRAINT "PK_5eabd07ae24930bac7a248da256" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diaries" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "behaviour" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "sum" integer NOT NULL, "activity" character varying NOT NULL, "steps" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ffd738e7d40dcfa59283dcaae87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "repetitions"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "repetitions" character varying NOT NULL`);

    await queryRunner.query('ALTER TABLE "users" ADD "stepsGoal" integer DEFAULT 70000');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "stepsGoal" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "stepsGoal" SET NOT NULL');

    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
    await queryRunner.query(
      `ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary-template-props" ADD CONSTRAINT "FK_dce5716790cc5c863b160f0bd52" FOREIGN KEY ("templateId") REFERENCES "diary-templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary-templates" ADD CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary-props" ADD CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf" FOREIGN KEY ("diaryId") REFERENCES "diaries"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diaries" ADD CONSTRAINT "FK_6454969d8c037fee60374c8527c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "diaries" DROP CONSTRAINT "FK_6454969d8c037fee60374c8527c"`);
    await queryRunner.query(`ALTER TABLE "diary-props" DROP CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf"`);
    await queryRunner.query(`ALTER TABLE "diary-templates" DROP CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058"`);
    await queryRunner.query(`ALTER TABLE "diary-template-props" DROP CONSTRAINT "FK_dce5716790cc5c863b160f0bd52"`);
    await queryRunner.query(`ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "repetitions"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "repetitions" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "stepsGoal"`);
    await queryRunner.query(`DROP TABLE "diaries"`);
    await queryRunner.query(`DROP TABLE "diary-props"`);
    await queryRunner.query(`DROP TABLE "diary-templates"`);
    await queryRunner.query(`DROP TABLE "diary-template-props"`);
    await queryRunner.query(
      `ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
