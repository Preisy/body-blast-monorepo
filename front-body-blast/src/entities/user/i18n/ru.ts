export default {
  home: {
    profile: {
      athropometrics: {
        weight: 'Вес',
        waist: 'Талия',
        abdomen: 'Низ живота',
        shoulder: 'Плечо',
        hip: 'Бедро',
        hipVolume: 'Объем бедер',
      },
      header: {
        student: 'ученик',
        admin: 'администратор',
      },
    },
  },
  auth: {
    signUp: {
      bodyParams: {
        errors: {
          weight: 'Вес должен быть между 20 и 600',
          height: 'Высота должна быть между 100 и 250',
        },
        fields: {
          age: 'Возраст',
          weight: 'Вес',
          height: 'Рост',
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
          firstname: 'Имя',
          lastname: 'Фамилия',
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
          nutrition: 'Запреты в питании',
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
