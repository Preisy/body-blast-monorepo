export default {
  home: {
    profile: {
      athropometrics: {
        weight: 'Weight',
        waist: 'Waist',
        abdomen: 'Underbelly',
        shoulder: 'Shoulder',
        hip: 'Hip',
        hipVolume: 'Hip volume',
      },
      header: {
        student: 'student',
        admin: 'admin',
      },
    },
  },
  auth: {
    signUp: {
      bodyParams: {
        errors: {
          weight: 'Weight must be between 20 and 600',
          height: 'Height must be between 100 and 250',
        },
        fields: {
          age: 'Age',
          weight: 'Weight',
          height: 'Height',
          teenAgeWeight: 'Weight in adolescence',
        },
      },
      credentials: {
        errors: {
          passwordMismatch: 'Passwords missmatch',
          strongPassword: 'Needs 1 uppercase and 1 number',
          secondName: 'Define your second name',
        },
        fields: {
          firstname: 'Firstname',
          lastname: 'Lastname',
          email: 'Email',
          password: 'Password',
          passwordRepeat: 'Repeat password',
        },
      },
      diseases: {
        fields: {
          gastrointestinalDiseases: 'Gastrointestinal diseases',
          insulinResistance: 'Insulin resistance',
          kidneyDisease: 'Kidney diseases',
          diseasesCVD: 'CVD diseases',
          diseasesODA: 'ODA diseases',
        },
      },
      forbiddens: {
        fields: {
          diet: 'Dietary restrictions',
          allergic: 'Allergics',
          intolerance: 'Food intolerance',
        },
      },
      motivations: {
        fields: {
          loadRestrictions: 'Load restrictions',
          sportExperience: 'Sports experience',
          targets: 'Targets',
        },
      },
    },
    login: {
      fields: {
        email: 'Email',
        password: 'Password',
      },
      controls: {
        forget: 'Forgot password',
      },
    },
  },
};
