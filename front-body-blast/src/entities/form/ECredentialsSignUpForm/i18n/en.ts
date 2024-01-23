export default {
  auth: {
    signUp: {
      credentials: {
        errors: {
          passwordMismatch: 'Passwords missmatch',
          strongPassword: 'Needs 1 uppercase and 1 number',
          secondName: 'Define your second name',
        },
        fields: {
          username: 'First and last name',
          email: 'Email',
          password: 'Password',
          passwordRepeat: 'Repeat password',
        },
      },
    },
  },
};
