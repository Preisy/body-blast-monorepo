import { MigrationInterface, QueryRunner } from 'typeorm';

export class AuthRefactoring1710077239457 implements MigrationInterface {
  name = 'AuthRefactoring1710077239457';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP CONSTRAINT "FK_dce5716790cc5c863b160f0bd52"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058"');
    await queryRunner.query('ALTER TABLE "diaries" DROP CONSTRAINT "FK_6454969d8c037fee60374c8527c"');
    await queryRunner.query('ALTER TABLE "diary-props" DROP CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf"');
    await queryRunner.query('ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"');
    await queryRunner.query('ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"');
    await queryRunner.query('ALTER TABLE "meal-items" DROP CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430"');
    await queryRunner.query('ALTER TABLE "nutrition" DROP CONSTRAINT "FK_b53992099fc6f05180344265762"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "tokenId"');
    await queryRunner.query('ALTER TABLE "tokens" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "tokens" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()');
    await queryRunner.query('ALTER TABLE "tokens" ADD "deleted_at" TIMESTAMP');
    await queryRunner.query('ALTER TABLE "tokens" ADD "userId" uuid');
    await queryRunner.query('ALTER TABLE "tokens" ADD CONSTRAINT "UQ_d417e5d35f2434afc4bd48cb4d2" UNIQUE ("userId")');
    await queryRunner.query(
      'ALTER TABLE "tokens" ADD CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diary-template-props" ADD CONSTRAINT "FK_dce5716790cc5c863b160f0bd52" FOREIGN KEY ("templateId") REFERENCES "diary-templates"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diary-templates" ADD CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diaries" ADD CONSTRAINT "FK_6454969d8c037fee60374c8527c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diary-props" ADD CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf" FOREIGN KEY ("diaryId") REFERENCES "diaries"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "meal-items" ADD CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430" FOREIGN KEY ("nutritionId") REFERENCES "nutrition"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "nutrition" ADD CONSTRAINT "FK_b53992099fc6f05180344265762" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "nutrition" DROP CONSTRAINT "FK_b53992099fc6f05180344265762"');
    await queryRunner.query('ALTER TABLE "meal-items" DROP CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430"');
    await queryRunner.query('ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"');
    await queryRunner.query('ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"');
    await queryRunner.query('ALTER TABLE "diary-props" DROP CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf"');
    await queryRunner.query('ALTER TABLE "diaries" DROP CONSTRAINT "FK_6454969d8c037fee60374c8527c"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058"');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP CONSTRAINT "FK_dce5716790cc5c863b160f0bd52"');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"');
    await queryRunner.query('ALTER TABLE "tokens" DROP CONSTRAINT "FK_d417e5d35f2434afc4bd48cb4d2"');
    await queryRunner.query('ALTER TABLE "tokens" DROP CONSTRAINT "UQ_d417e5d35f2434afc4bd48cb4d2"');
    await queryRunner.query('ALTER TABLE "tokens" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "tokens" DROP COLUMN "deleted_at"');
    await queryRunner.query('ALTER TABLE "tokens" DROP COLUMN "updated_at"');
    await queryRunner.query('ALTER TABLE "tokens" DROP COLUMN "created_at"');
    await queryRunner.query('ALTER TABLE "users" ADD "tokenId" uuid');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_d98a275f8bc6cd986fcbe2eab01" UNIQUE ("tokenId")');
    await queryRunner.query(
      'ALTER TABLE "nutrition" ADD CONSTRAINT "FK_b53992099fc6f05180344265762" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "meal-items" ADD CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430" FOREIGN KEY ("nutritionId") REFERENCES "nutrition"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diary-props" ADD CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf" FOREIGN KEY ("diaryId") REFERENCES "diaries"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diaries" ADD CONSTRAINT "FK_6454969d8c037fee60374c8527c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diary-templates" ADD CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "diary-template-props" ADD CONSTRAINT "FK_dce5716790cc5c863b160f0bd52" FOREIGN KEY ("templateId") REFERENCES "diary-templates"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }
}
