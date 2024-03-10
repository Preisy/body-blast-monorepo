import { MigrationInterface, QueryRunner } from 'typeorm';

export class IdToUuid1710068913927 implements MigrationInterface {
  name = 'IdToUuid1710068913927';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('delete from tokens');
    await queryRunner.query('delete from anthropometrics');
    await queryRunner.query('delete from diaries');
    await queryRunner.query('delete from files');
    await queryRunner.query('delete from food');
    await queryRunner.query('delete from workouts');
    await queryRunner.query('delete from video');
    await queryRunner.query('delete from nutrition');
    await queryRunner.query('delete from video');
    await queryRunner.query('delete from exercises');
    await queryRunner.query('delete from "diary-props"');
    await queryRunner.query('delete from "diary-template-props"');
    await queryRunner.query('delete from "diary-templates"');
    await queryRunner.query('delete from "meal-items"');
    await queryRunner.query("delete from users where role = 'client'");
    await queryRunner.query('delete from tokens');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP CONSTRAINT "FK_dce5716790cc5c863b160f0bd52"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058"');
    await queryRunner.query('ALTER TABLE "diaries" DROP CONSTRAINT "FK_6454969d8c037fee60374c8527c"');
    await queryRunner.query('ALTER TABLE "diary-props" DROP CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf"');
    await queryRunner.query('ALTER TABLE "tokens" DROP CONSTRAINT "PK_3001e89ada36263dabf1fb6210a"');
    await queryRunner.query('ALTER TABLE "tokens" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "tokens" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "tokens" ADD CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"');
    await queryRunner.query('ALTER TABLE "nutrition" DROP CONSTRAINT "FK_b53992099fc6f05180344265762"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "users" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "REL_d98a275f8bc6cd986fcbe2eab0"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "tokenId"');
    await queryRunner.query('ALTER TABLE "users" ADD "tokenId" uuid');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_d98a275f8bc6cd986fcbe2eab01" UNIQUE ("tokenId")');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP CONSTRAINT "PK_227358fe517ea3230ab655c3682"');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "anthropometrics" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "anthropometrics" ADD CONSTRAINT "PK_47509a6b079689766842a06067e" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "anthropometrics" ADD "userId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "video" DROP CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e"');
    await queryRunner.query('ALTER TABLE "video" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "video" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "video" ADD CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP CONSTRAINT "PK_094f31bd7de57a8838b99349dc9"');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diary-template-props" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "diary-template-props" ADD CONSTRAINT "PK_094f31bd7de57a8838b99349dc9" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP COLUMN "templateId"');
    await queryRunner.query('ALTER TABLE "diary-template-props" ADD "templateId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diary-templates" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "diary-templates" ADD CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "REL_5f67fdf2ae7685f78b8733f505"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "diary-templates" ADD "userId" uuid NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "diary-templates" ADD CONSTRAINT "UQ_5f67fdf2ae7685f78b8733f5058" UNIQUE ("userId")',
    );
    await queryRunner.query('ALTER TABLE "files" DROP CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9"');
    await queryRunner.query('ALTER TABLE "files" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "files" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "files" ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "diaries" DROP CONSTRAINT "PK_ffd738e7d40dcfa59283dcaae87"');
    await queryRunner.query('ALTER TABLE "diaries" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diaries" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "diaries" ADD CONSTRAINT "PK_ffd738e7d40dcfa59283dcaae87" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "diaries" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "diaries" ADD "userId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "diary-props" DROP CONSTRAINT "PK_5eabd07ae24930bac7a248da256"');
    await queryRunner.query('ALTER TABLE "diary-props" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diary-props" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "diary-props" ADD CONSTRAINT "PK_5eabd07ae24930bac7a248da256" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "diary-props" DROP COLUMN "diaryId"');
    await queryRunner.query('ALTER TABLE "diary-props" ADD "diaryId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "meal-items" DROP CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430"');
    await queryRunner.query('ALTER TABLE "nutrition" DROP CONSTRAINT "PK_e8da4724c54762e994d879b11c3"');
    await queryRunner.query('ALTER TABLE "nutrition" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "nutrition" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "nutrition" ADD CONSTRAINT "PK_e8da4724c54762e994d879b11c3" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "nutrition" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "nutrition" ADD "userId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "meal-items" DROP CONSTRAINT "PK_9ca583c20b7ec790a47a679e0ea"');
    await queryRunner.query('ALTER TABLE "meal-items" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "meal-items" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "meal-items" ADD CONSTRAINT "PK_9ca583c20b7ec790a47a679e0ea" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "meal-items" DROP COLUMN "nutritionId"');
    await queryRunner.query('ALTER TABLE "meal-items" ADD "nutritionId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "food" DROP CONSTRAINT "PK_26d12de4b6576ff08d30c281837"');
    await queryRunner.query('ALTER TABLE "food" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "food" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "food" ADD CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"');
    await queryRunner.query('ALTER TABLE "workouts" DROP CONSTRAINT "PK_5b2319bf64a674d40237dbb1697"');
    await queryRunner.query('ALTER TABLE "workouts" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "workouts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "workouts" ADD CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "workouts" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "workouts" ADD "userId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "exercises" DROP CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3"');
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "exercises" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query(
      'ALTER TABLE "exercises" ADD CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "workoutId"');
    await queryRunner.query('ALTER TABLE "exercises" ADD "workoutId" uuid NOT NULL');
    await queryRunner.query('ALTER TABLE "prompts" DROP CONSTRAINT "PK_21f33798862975179e40b216a1d"');
    await queryRunner.query('ALTER TABLE "prompts" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "prompts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()');
    await queryRunner.query('ALTER TABLE "prompts" ADD CONSTRAINT "PK_21f33798862975179e40b216a1d" PRIMARY KEY ("id")');
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
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
      'ALTER TABLE "nutrition" ADD CONSTRAINT "FK_b53992099fc6f05180344265762" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "meal-items" ADD CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430" FOREIGN KEY ("nutritionId") REFERENCES "nutrition"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"');
    await queryRunner.query('ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"');
    await queryRunner.query('ALTER TABLE "meal-items" DROP CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430"');
    await queryRunner.query('ALTER TABLE "nutrition" DROP CONSTRAINT "FK_b53992099fc6f05180344265762"');
    await queryRunner.query('ALTER TABLE "diary-props" DROP CONSTRAINT "FK_37fbf7a32d89266ce1877e84abf"');
    await queryRunner.query('ALTER TABLE "diaries" DROP CONSTRAINT "FK_6454969d8c037fee60374c8527c"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058"');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP CONSTRAINT "FK_dce5716790cc5c863b160f0bd52"');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "prompts" DROP CONSTRAINT "PK_21f33798862975179e40b216a1d"');
    await queryRunner.query('ALTER TABLE "prompts" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "prompts" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "prompts" ADD CONSTRAINT "PK_21f33798862975179e40b216a1d" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "workoutId"');
    await queryRunner.query('ALTER TABLE "exercises" ADD "workoutId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "exercises" DROP CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3"');
    await queryRunner.query('ALTER TABLE "exercises" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "exercises" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "exercises" ADD CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "workouts" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "workouts" ADD "userId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "workouts" DROP CONSTRAINT "PK_5b2319bf64a674d40237dbb1697"');
    await queryRunner.query('ALTER TABLE "workouts" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "workouts" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "workouts" ADD CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "food" DROP CONSTRAINT "PK_26d12de4b6576ff08d30c281837"');
    await queryRunner.query('ALTER TABLE "food" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "food" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "food" ADD CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "meal-items" DROP COLUMN "nutritionId"');
    await queryRunner.query('ALTER TABLE "meal-items" ADD "nutritionId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "meal-items" DROP CONSTRAINT "PK_9ca583c20b7ec790a47a679e0ea"');
    await queryRunner.query('ALTER TABLE "meal-items" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "meal-items" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "meal-items" ADD CONSTRAINT "PK_9ca583c20b7ec790a47a679e0ea" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "nutrition" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "nutrition" ADD "userId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "nutrition" DROP CONSTRAINT "PK_e8da4724c54762e994d879b11c3"');
    await queryRunner.query('ALTER TABLE "nutrition" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "nutrition" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "nutrition" ADD CONSTRAINT "PK_e8da4724c54762e994d879b11c3" PRIMARY KEY ("id")',
    );
    await queryRunner.query(
      'ALTER TABLE "meal-items" ADD CONSTRAINT "FK_4b85c51c9bcaab70b800f5bd430" FOREIGN KEY ("nutritionId") REFERENCES "nutrition"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "diary-props" DROP COLUMN "diaryId"');
    await queryRunner.query('ALTER TABLE "diary-props" ADD "diaryId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "diary-props" DROP CONSTRAINT "PK_5eabd07ae24930bac7a248da256"');
    await queryRunner.query('ALTER TABLE "diary-props" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diary-props" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "diary-props" ADD CONSTRAINT "PK_5eabd07ae24930bac7a248da256" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "diaries" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "diaries" ADD "userId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "diaries" DROP CONSTRAINT "PK_ffd738e7d40dcfa59283dcaae87"');
    await queryRunner.query('ALTER TABLE "diaries" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diaries" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "diaries" ADD CONSTRAINT "PK_ffd738e7d40dcfa59283dcaae87" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "files" DROP CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9"');
    await queryRunner.query('ALTER TABLE "files" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "files" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "files" ADD CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "UQ_5f67fdf2ae7685f78b8733f5058"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "diary-templates" ADD "userId" integer NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "diary-templates" ADD CONSTRAINT "REL_5f67fdf2ae7685f78b8733f505" UNIQUE ("userId")',
    );
    await queryRunner.query('ALTER TABLE "diary-templates" DROP CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1"');
    await queryRunner.query('ALTER TABLE "diary-templates" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diary-templates" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "diary-templates" ADD CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP COLUMN "templateId"');
    await queryRunner.query('ALTER TABLE "diary-template-props" ADD "templateId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP CONSTRAINT "PK_094f31bd7de57a8838b99349dc9"');
    await queryRunner.query('ALTER TABLE "diary-template-props" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "diary-template-props" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "diary-template-props" ADD CONSTRAINT "PK_094f31bd7de57a8838b99349dc9" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "video" DROP CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e"');
    await queryRunner.query('ALTER TABLE "video" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "video" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "video" ADD CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id")');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP COLUMN "userId"');
    await queryRunner.query('ALTER TABLE "anthropometrics" ADD "userId" integer NOT NULL');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP CONSTRAINT "PK_47509a6b079689766842a06067e"');
    await queryRunner.query('ALTER TABLE "anthropometrics" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "anthropometrics" ADD "id" SERIAL NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "anthropometrics" ADD CONSTRAINT "PK_227358fe517ea3230ab655c3682" PRIMARY KEY ("id")',
    );
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "tokenId"');
    await queryRunner.query('ALTER TABLE "users" ADD "tokenId" integer');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "REL_d98a275f8bc6cd986fcbe2eab0" UNIQUE ("tokenId")');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "users" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id")');
    await queryRunner.query(
      'ALTER TABLE "nutrition" ADD CONSTRAINT "FK_b53992099fc6f05180344265762" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "anthropometrics" ADD CONSTRAINT "FK_3b8430319ce59f020bf8d3eca55" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query('ALTER TABLE "tokens" DROP CONSTRAINT "PK_3001e89ada36263dabf1fb6210a"');
    await queryRunner.query('ALTER TABLE "tokens" DROP COLUMN "id"');
    await queryRunner.query('ALTER TABLE "tokens" ADD "id" SERIAL NOT NULL');
    await queryRunner.query('ALTER TABLE "tokens" ADD CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id")');
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
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }
}
