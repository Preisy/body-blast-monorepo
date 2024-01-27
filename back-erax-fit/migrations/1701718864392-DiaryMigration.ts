import { MigrationInterface, QueryRunner } from 'typeorm';

export class DiaryMigration1701718864392 implements MigrationInterface {
  name = 'DiaryMigration1701718864392';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069"`);
    await queryRunner.query(
      `CREATE TABLE "template-props" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "label" character varying NOT NULL, "templateId" integer NOT NULL, CONSTRAINT "PK_f99a641bce32445fdcd80c3ee65" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diary-templates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "self-control" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "behaviour" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "sum" integer, "activity" character varying, "steps" integer, "userId" integer NOT NULL, CONSTRAINT "PK_d96193744b513150000eb48e39f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "self-control-props" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "label" character varying NOT NULL, "value" integer, "selfControlId" integer NOT NULL, CONSTRAINT "PK_813c99a0faf2a6f33a336ec3887" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query('INSERT INTO "diary-templates" ("id") VALUES (1)');
    await queryRunner.query(`ALTER TABLE "users" ADD "stepsGoal" integer DEFAULT 70000`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "stepsGoal" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "stepsGoal" SET NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" ADD "templateId" integer DEFAULT 1`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "templateId" DROP DEFAULT`);
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "templateId" SET NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "template-props" ADD CONSTRAINT "FK_3328d6b84cdf6e3a3723004dc91" FOREIGN KEY ("templateId") REFERENCES "diary-templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_8c95edc5c53f3407a7c816070ff" FOREIGN KEY ("templateId") REFERENCES "diary-templates"("id") ON DELETE SET DEFAULT ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "self-control" ADD CONSTRAINT "FK_345d5c05b4d95ec941bf23927ee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "self-control-props" ADD CONSTRAINT "FK_cbab0ca9f2200e1057913c2b60e" FOREIGN KEY ("selfControlId") REFERENCES "self-control"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query('INSERT INTO "template-props" ("label", "templateId") VALUES (\'Сон\', 1)');
    await queryRunner.query('INSERT INTO "template-props" ("label", "templateId") VALUES (\'Работоспособность\', 1)');
    await queryRunner.query('INSERT INTO "template-props" ("label", "templateId") VALUES (\'Питание\', 1)');
    await queryRunner.query('INSERT INTO "template-props" ("label", "templateId") VALUES (\'Слежу за здоровьем\', 1)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "self-control-props" DROP CONSTRAINT "FK_cbab0ca9f2200e1057913c2b60e"`);
    await queryRunner.query(`ALTER TABLE "self-control" DROP CONSTRAINT "FK_345d5c05b4d95ec941bf23927ee"`);
    await queryRunner.query(`ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_8c95edc5c53f3407a7c816070ff"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "template-props" DROP CONSTRAINT "FK_3328d6b84cdf6e3a3723004dc91"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "templateId"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "stepsGoal"`);
    await queryRunner.query(`DROP TABLE "self-control-props"`);
    await queryRunner.query(`DROP TABLE "self-control"`);
    await queryRunner.query(`DROP TABLE "diary-templates"`);
    await queryRunner.query(`DROP TABLE "template-props"`);
    await queryRunner.query(
      `ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query('delete from "diary-templates" where id = 1;');
    await queryRunner.query('delete from "self-control-props" where templateId = 1;');
  }
}
