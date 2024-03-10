import { MigrationInterface, QueryRunner } from "typeorm";

export class NutritionMigration1699700944600 implements MigrationInterface {
    name = 'NutritionMigration1699700944600'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "food" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" character varying NOT NULL, "category" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "nutrition" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_e8da4724c54762e994d879b11c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal-items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "category" integer NOT NULL, "type" character varying NOT NULL, "quantity" character varying NOT NULL, "nutritionId" integer NOT NULL, CONSTRAINT "PK_9ca583c20b7ec790a47a679e0ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nutrition" ADD CONSTRAINT "FK_b53992099fc6f05180344265762" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal-items" ADD CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430" FOREIGN KEY ("nutritionId") REFERENCES "nutrition"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal-items" DROP CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430"`);
        await queryRunner.query(`ALTER TABLE "nutrition" DROP CONSTRAINT "FK_b53992099fc6f05180344265762"`);
        await queryRunner.query(`DROP TABLE "meal-items"`);
        await queryRunner.query(`DROP TABLE "nutrition"`);
        await queryRunner.query(`DROP TABLE "food"`);
    }

}
