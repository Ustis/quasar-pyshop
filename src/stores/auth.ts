import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { Notify } from 'quasar';
import { setAuthHeader, setAuthHeaderEmpty } from 'src/helpers/interceptor-setter';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // True если token не null или не пустая строка
    isAuthorized: !(localStorage.getItem('token') == null
      || localStorage.getItem('token') == ''),
    token: localStorage.getItem('token') || ''
  }),

  getters: {
    getIsAuthorized: (state) => state.isAuthorized
  },

  actions: {
    async login(loginDto: { email: string, password: string }) {
      const data = JSON.stringify(loginDto);
      api.post('/auth/login', data)
        .then(response => {
          this.isAuthorized = true;
          this.token = response.data.accessToken;
          localStorage.setItem('token', response.data.accessToken);
          setAuthHeader();
          Notify.create('Успешно');
          this.router.push('/');
        })
        .catch(error => {
          if (error.response.status === 401) {
            if (error.response.data.message === 'User with provided email does not exist')
              Notify.create('Не существует пользователя с такой почтой');
            else if (error.response.data.message === 'Incorrect password')
              Notify.create('Неправильный пароль');
            else Notify.create(error.message + error.response.data.message);
          } else if (error.response.status === 400)
            Notify.create('Поля не должны быть пусты');
          else Notify.create(error.response.data.message);
        });
    },

    async register(registerDto: { email: string, password: string }) {
      const data = JSON.stringify(registerDto);
      api.post('/auth/register', data)
        .then(() => {
          Notify.create('Успешно зарегистрирован, ' +
            'вы будете перенаправлены на страницу входа');
          setTimeout(() => this.router.push({ name: 'login' }), 3000);
        })
        .catch(error => {
          if (error.response.status === 409)
            Notify.create('Пользователь с такой почтой уже существует');
          else if (error.response.status === 400)
            Notify.create('Регистрационные данные не подходят по параметрам'
              + error.message);
          else
            Notify.create('Ошибка ' + error.response.status + ' ' + error.message);
        });
    },

    logout() {
      this.isAuthorized = false;
      this.token = '';
      setAuthHeaderEmpty();
      localStorage.removeItem('token');
      this.router.push({ name: 'login' });
    },

    tokenVerification() {
      if (this.isAuthorized)
        api.get('/auth/checkToken',
          { headers: { Authorization: 'Bearer ' + this.token } })
          .then(() => {
            setAuthHeader();
          })
          .catch(() => {
              Notify.create('Токен истек, перенаправление на страницу авторизации');
              setTimeout(() => this.logout(), 3000);
            }
          );
    }
  }
});
