import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkoutMigration1698674646699 implements MigrationInterface {
  name = 'WorkoutMigration1698674646699';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(
      `CREATE TABLE "files" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "fileName" character varying NOT NULL, "path" character varying NOT NULL, "fileLInk" character varying NOT NULL, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "trainerComment" character varying, "weight" integer NOT NULL, "sets" integer NOT NULL, "repetitions" integer NOT NULL, "restTime" integer NOT NULL, "pace" character varying NOT NULL, "photoLink" character varying NOT NULL, "videoLink" character varying NOT NULL, "workoutId" integer NOT NULL, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "workouts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "comment" character varying, "date" TIMESTAMP NOT NULL, "loop" integer, "userId" integer NOT NULL, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"`);
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"`);
    await queryRunner.query(`DROP TABLE "workouts"`);
    await queryRunner.query(`DROP TABLE "exercises"`);
    await queryRunner.query(`DROP TABLE "files"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
