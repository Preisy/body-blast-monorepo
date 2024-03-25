export default {
  auth: {
    signUp: {
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
    },
  },
};
