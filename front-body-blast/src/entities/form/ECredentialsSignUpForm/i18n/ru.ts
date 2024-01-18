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
          username: 'Имя и фамилия',
          email: 'Почта',
          password: 'Пароль',
          passwordRepeat: 'Повторите пароль',
        },
      },
    },
  },
};
