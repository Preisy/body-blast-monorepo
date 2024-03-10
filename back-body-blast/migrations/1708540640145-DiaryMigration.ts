import { MigrationInterface, QueryRunner } from 'typeorm';

export class DiaryMigration1708540640145 implements MigrationInterface {
  name = 'DiaryMigration1708540640145';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"`);
    await queryRunner.query(`ALTER TABLE "workouts" RENAME COLUMN "loop" TO "cycle"`);
    await queryRunner.query(
      `CREATE TABLE "diary-templates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "REL_5f67fdf2ae7685f78b8733f505" UNIQUE ("userId"), CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diary-template-props" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "label" character varying(50) NOT NULL, "templateId" integer NOT NULL, CONSTRAINT "PK_094f31bd7de57a8838b99349dc9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diary-props" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "label" character varying(50) NOT NULL, "value" integer, "diaryId" integer NOT NULL, CONSTRAINT "PK_5eabd07ae24930bac7a248da256" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "diaries" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "cycle" integer, "date" TIMESTAMP NOT NULL, "sum" integer, "activity" character varying(250), "steps" integer, "userId" integer NOT NULL, CONSTRAINT "PK_ffd738e7d40dcfa59283dcaae87" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query('ALTER TABLE "users" ADD "stepsGoal" integer DEFAULT 70000');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "stepsGoal" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "stepsGoal" SET NOT NULL');
    await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "food" ADD "type" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "food" ADD "name" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "workouts" ADD "name" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "comment"`);
    await queryRunner.query(`ALTER TABLE "workouts" ADD "comment" character varying(250)`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "name" character varying(100) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "trainerComment"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "trainerComment" character varying(250)`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "weight" double precision NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "pace"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "pace" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "photoLink"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "photoLink" character varying(250) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "videoLink"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "videoLink" character varying(250) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "meal-items" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "meal-items" ADD "type" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "meal-items" DROP COLUMN "quantity"`);
    await queryRunner.query(`ALTER TABLE "meal-items" ADD "quantity" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "nutrition" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "nutrition" ADD "name" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "fileName"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "fileName" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "path"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "path" character varying(250) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "fileLInk"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "fileLInk" character varying(250) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prompts" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "prompts" ADD "type" character varying(50) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prompts" DROP COLUMN "photoLink"`);
    await queryRunner.query(`ALTER TABLE "prompts" ADD "photoLink" character varying(250) NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prompts" DROP COLUMN "videoLink"`);
    await queryRunner.query(`ALTER TABLE "prompts" ADD "videoLink" character varying(250) NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary-templates" ADD CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary-template-props" ADD CONSTRAINT "FK_dce5716790cc5c863b160f0bd52" FOREIGN KEY ("templateId") REFERENCES "diary-templates"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "diary-props" ADD CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf" FOREIGN KEY ("diaryId") REFERENCES "diaries"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "diaries" ADD CONSTRAINT "FK_6454969d8c037fee60374c8527c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "diaries" DROP CONSTRAINT "FK_6454969d8c037fee60374c8527c"`);
    await queryRunner.query(`ALTER TABLE "diary-props" DROP CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf"`);
    await queryRunner.query(`ALTER TABLE "diary-template-props" DROP CONSTRAINT "FK_dce5716790cc5c863b160f0bd52"`);
    await queryRunner.query(`ALTER TABLE "diary-templates" DROP CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058"`);
    await queryRunner.query(`ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "prompts" DROP COLUMN "videoLink"`);
    await queryRunner.query(`ALTER TABLE "prompts" ADD "videoLink" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prompts" DROP COLUMN "photoLink"`);
    await queryRunner.query(`ALTER TABLE "prompts" ADD "photoLink" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "prompts" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "prompts" ADD "type" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "fileLInk"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "fileLInk" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "path"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "path" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "files" DROP COLUMN "fileName"`);
    await queryRunner.query(`ALTER TABLE "files" ADD "fileName" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "nutrition" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "nutrition" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "meal-items" DROP COLUMN "quantity"`);
    await queryRunner.query(`ALTER TABLE "meal-items" ADD "quantity" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "meal-items" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "meal-items" ADD "type" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "videoLink"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "videoLink" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "photoLink"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "photoLink" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "pace"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "pace" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "weight"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "weight" integer NOT NULL`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "trainerComment"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "trainerComment" character varying`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "exercises" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "comment"`);
    await queryRunner.query(`ALTER TABLE "workouts" ADD "comment" character varying`);
    await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "workouts" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "name"`);
    await queryRunner.query(`ALTER TABLE "food" ADD "name" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "food" DROP COLUMN "type"`);
    await queryRunner.query(`ALTER TABLE "food" ADD "type" character varying NOT NULL`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "stepsGoal"`);
    await queryRunner.query(`DROP TABLE "diaries"`);
    await queryRunner.query(`DROP TABLE "diary-props"`);
    await queryRunner.query(`DROP TABLE "diary-template-props"`);
    await queryRunner.query(`DROP TABLE "diary-templates"`);
    await queryRunner.query(`ALTER TABLE "workouts" RENAME COLUMN "cycle" TO "loop"`);
    await queryRunner.query(
      `ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
