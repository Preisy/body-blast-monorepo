import { MigrationInterface, QueryRunner } from 'typeorm';

export class FoodDefaultsMigration1709491516496 implements MigrationInterface {
  name = 'FoodDefaultsMigration1709491516496';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Крупы', 'Овсянка')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Крупы', 'Булгур')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Крупы', 'Гречка')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Крупы', 'Рис')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (3, 'Крупы', 'Полба')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (3, 'Крупы', 'Перловка')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (3, 'Крупы', 'Пшенка')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (3, 'Крупы', 'Киноа')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Баклажан')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Редис')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Кабачок')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Капуста')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Перец')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Репа')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Огурцы')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Томаты')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (1, 'Овощи', 'Щавель')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Овощи', 'Лук')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Овощи', 'Брюква')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Овощи', 'Морковь')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Овощи', 'Редька')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Овощи', 'Свекла')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Овощи', 'Зеленая фасоль')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Овощи', 'Черемша')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Фрукты и ягоды', 'Бананы')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Фрукты и ягоды', 'Киви')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Фрукты и ягоды', 'Виноград')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (2, 'Фрукты и ягоды', 'Хурма')");
    await queryRunner.query("INSERT INTO food (category, type, name) VALUES (3, 'Фрукты и ягоды', 'Сухофрукты')");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('delete from food;');
  }
}
