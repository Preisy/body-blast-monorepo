import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed2617378125500 implements MigrationInterface {
  name = 'Seed2617378125500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // await queryRunner.query(
    //   "INSERT INTO users (email, first_name, last_name, \"role\", \"password\") VALUES ('a@mail.ru', 'Admin', 'Adminovich', 'admin', '$2b$10$NiyA7SyeXWmbyTBEvs8Xou01CEE7TaWCNN9XeQNOfV.YsVGls.3Y2')",
    // );
    await queryRunner.query(
      'INSERT INTO users (email, first_name, last_name, "role", "password", "age","height","weight","weightInYouth","nutritRestrict","allergy","gastroDeseases","mealIntolerance","insulinResistance","kidneyDesease","heartDesease","muscleDesease","loadRestrictions","sportsExp","goals") VALUES (\'a@mail.ru\', \'Admin\', \'Adminovich\', \'admin\', \'$2b$10$NiyA7SyeXWmbyTBEvs8Xou01CEE7TaWCNN9XeQNOfV.YsVGls.3Y2\',12,120,120,120,true,true,\'as\',\'as\' ,true,\'as\',true,\'as\', true,\'as\',\'as\')',
    );
    await queryRunner.query(
      'INSERT INTO users (email, first_name, last_name, "role", "password", "age","height","weight","weightInYouth","nutritRestrict","allergy","gastroDeseases","mealIntolerance","insulinResistance","kidneyDesease","heartDesease","muscleDesease","loadRestrictions","sportsExp","goals") VALUES (\'c1@mail.ru\', \'Client\', \'Clientovich\', \'client\', \'$2b$10$NiyA7SyeXWmbyTBEvs8Xou01CEE7TaWCNN9XeQNOfV.YsVGls.3Y2\',12,120,120,120,true,true,\'as\',\'as\' ,true,\'as\',true,\'as\', true,\'as\',\'as\')',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("delete from users where email = 'a@mail.ru';");
    await queryRunner.query("delete from users where email = 'c1@mail.ru';");
  }
}
