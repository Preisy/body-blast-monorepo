import { MigrationInterface, QueryRunner } from 'typeorm';

export class Registr1698417757715 implements MigrationInterface {
  name = 'Registr1698417757715';

  entries = [
    { columnName: 'age', type: 'smallint', default: 25 },
    { columnName: 'height', type: 'double precision', default: 185 },
    { columnName: 'weight', type: 'double precision', default: 81 },
    { columnName: 'weightInYouth', type: 'double precision', default: 71 },
    { columnName: 'nutritRestrict', type: 'boolean', default: false },
    { columnName: 'allergy', type: 'boolean', default: false },
    { columnName: 'gastroDeseases', type: 'character varying(256)', default: "'default'" },
    { columnName: 'mealIntolerance', type: 'character varying(256)', default: "'default'" },
    { columnName: 'insulinResistance', type: 'boolean', default: false },
    { columnName: 'kidneyDesease', type: 'character varying(128)', default: "'default'" },
    { columnName: 'heartDesease', type: 'boolean', default: false },
    { columnName: 'muscleDesease', type: 'character varying(128)', default: "'default'" },
    { columnName: 'loadRestrictions', type: 'boolean', default: false },
    { columnName: 'sportsExp', type: 'character varying(128)', default: "'default'" },
    { columnName: 'goals', type: 'character varying(256)', default: "'default'" },
  ];

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    for (const elem of this.entries) {
      await queryRunner.query(`ALTER TABLE "users" ADD "${elem.columnName}" ${elem.type} DEFAULT ${elem.default}`);
      await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "${elem.columnName}" DROP DEFAULT`);
      await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "${elem.columnName}" SET NOT NULL`);
    }
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "first_name" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "first_name" DROP NOT NULL');
    for (const elem of this.entries) {
      await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "${elem.columnName}"`);
    }
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }
}
