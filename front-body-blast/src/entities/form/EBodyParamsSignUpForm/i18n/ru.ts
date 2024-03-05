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
          weight: 'Вес',
          height: 'Рост',
          teenAgeWeight: 'Вес в подростковом возрасте',
        },
      },
    },
  },
};
