const ru = {
  translation: {
    mainNavigation: {
      exitButton: 'Выйти',
      title: 'Hexlet Chat',
    },
    image: {
      login: 'регистрация',
      signup: 'авторизация',
    },
    loading: {
      text: 'Загрузка...',
    },
    loginPage: {
      question: 'Нет аккаунта? ',
      registration: 'Регистрация',
    },
    loginForm: {
      title: 'Войти',
      username: 'Ваш ник',
      password: 'Пароль',
      submitButton: 'Войти',
      feedback: 'Неверные имя пользователя или пароль',
    },
    signupForm: {
      title: 'Регистрация',
      username: 'Имя пользователя',
      password: 'Пароль',
      confirmPassword: 'Подтвердите пароль',
      submitButton: 'Зарегистрироваться',
      errors: {
        usernameRange: 'От 3 до 20 символов',
        usernameExist: 'Такой пользователь уже существует',
        passwordRange: 'Не менее 6 символов',
        passwordConfirm: 'Пароли должны совпадать',
        required: 'Обязательное поле',
      },
      button: 'Зарегистрироваться',
    },
    notFoundPage: {
      logoAlt: 'Страница не найдена',
      title: 'Страница не найдена',
      text: 'Но вы можете перейти ',
      link: 'на главную страницу',
    },
    chatPage: {
      title: 'Каналы',
      addButton: '+',
    },
    messageInput: {
      label: 'Новое сообщение',
      placeholder: 'Введите сообщение...',
      submitButton: 'Отправить',
    },
    chatBox: {
      messages_one: '{{count}} сообщение',
      messages_few: '{{count}} сообщения',
      messages_many: '{{count}} сообщений',
    },
    channel: {
      description: 'Управление каналом',
      deleteButton: 'Удалить',
      renameButton: 'Переименовать',
    },
    modal: {
      label: 'Имя канала',
      validation: {
        notOneOf: 'Должно быть уникальным',
        range: 'От 3 до 20 символов',
        required: 'Обязательное поле',
      },
      add: {
        title: 'Добавить канал',
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
      },
      delete: {
        title: 'Удалить канал',
        question: 'Уверены?',
        cancelButton: 'Отменить',
        deleteButton: 'Удалить',
      },
      rename: {
        title: 'Переименовать канал',
        cancelButton: 'Отменить',
        submitButton: 'Отправить',
      },
    },
    toastify: {
      error: {
        connectionError: 'Ошибка соединения',
        authError: 'Ошибка авторизации',
        commonError: 'Ошибка',
      },
      success: {
        channel: {
          add: 'Канал создан',
          rename: 'Канал переименован',
          delete: 'Канал удалён',
        },
      },
    },
  },
};

export default ru;
