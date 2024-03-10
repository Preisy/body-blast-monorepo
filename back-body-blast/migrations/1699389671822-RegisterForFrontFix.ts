import { MigrationInterface, QueryRunner } from 'typeorm';

export class RegisterForFrontFix1699389671822 implements MigrationInterface {
  name = 'RegisterForFrontFix1699389671822';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "nutritRestrict"');
    await queryRunner.query('ALTER TABLE "users" ADD "nutritRestrict" character varying(256) DEFAULT \'default\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "nutritRestrict" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "nutritRestrict" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "allergy"');
    await queryRunner.query('ALTER TABLE "users" ADD "allergy" character varying(256) DEFAULT \'default\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "allergy" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "allergy" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "heartDesease"');
    await queryRunner.query('ALTER TABLE "users" ADD "heartDesease" character varying(256) DEFAULT \'default\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "heartDesease" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "heartDesease" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "loadRestrictions"');
    await queryRunner.query('ALTER TABLE "users" ADD "loadRestrictions" character varying(256) DEFAULT \'default\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "loadRestrictions" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "loadRestrictions" SET NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "loadRestrictions"');
    await queryRunner.query('ALTER TABLE "users" ADD "loadRestrictions" boolean DEFAULT \'false\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "loadRestrictions" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "loadRestrictions" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "heartDesease"');
    await queryRunner.query('ALTER TABLE "users" ADD "heartDesease" boolean DEFAULT \'false\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "heartDesease" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "heartDesease" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "allergy"');
    await queryRunner.query('ALTER TABLE "users" ADD "allergy" boolean DEFAULT \'false\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "allergy" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "allergy" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "nutritRestrict"');
    await queryRunner.query('ALTER TABLE "users" ADD "nutritRestrict" boolean DEFAULT \'false\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "nutritRestrict" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "nutritRestrict" SET NOT NULL');
  }
}
