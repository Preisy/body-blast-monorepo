export default {
  auth: {
    signUp: {
      bodyParams: {
        errors: {
          weight: 'Weight must be between 20 and 600',
          height: 'Height must be between 100 and 250',
        },
        fields: {
          age: 'Age',
          weightAndHeight: 'Weight and height',
          teenAgeWeight: 'Weight in adolescence',
        },
      },
    },
  },
};
