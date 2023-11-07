export default {
  auth: {
    signUp: {
      bodyParams: {
        errors: {
          weight: 'Вес должен быть между 20 и 600',
          height: 'Высота должна быть между 100 и 250',
        },
        fields: {
          age: 'Возраст',
          weightAndHeight: 'Вес и рост',
          teenAgeWeight: 'Вес в подростковом возрасте',
        },
      },
      credentials: {
        errors: {
          passwordMismatch: 'Пароли не совпадают',
          strongPassword: 'Нужна 1 большая буква и 1 цифра',
          secondName: 'Введите фамилию',
        },
        fields: {
          username: 'Имя и фамилия',
          email: 'Почта',
          password: 'Пароль',
          passwordRepeat: 'Повторите пароль',
        },
      },
      diseases: {
        fields: {
          gastrointestinalDiseases: 'Заболевания ЖКТ',
          insulinResistance: 'Инсулинрезистентность',
          kidneyDisease: 'Заболевания почек',
          diseasesCVD: 'Заболевания ССС',
          diseasesODA: 'Заболевания ОДА',
        },
      },
      forbiddens: {
        fields: {
          diet: 'Запреты в питании',
          allergic: 'Аллергии',
          intolerance: 'Непереносимость продуктов',
        },
      },
      motivations: {
        fields: {
          loadRestrictions: 'Запреты в нагрузке',
          sportExperience: 'Спортивный опыт',
          targets: 'Цели',
        },
      },
    },
    login: {
      fields: {
        email: 'Почта',
        password: 'Пароль',
      },
      controls: {
        forget: 'Забыли пароль',
      },
    },
  },
};
