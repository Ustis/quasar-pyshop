<template>
  <q-layout view="xs md lg">
    <q-btn v-on:click="logout" class="fixed-top-right">Выйти</q-btn>
    <div class="row">
      <div class="vertical-middle absolute-center">
        <h4>Действия с аккаунтом</h4>
        <q-form
          @submit="updateUserData"
          @reset="deleteUserData"
          class="q-gutter-md">
          <div class="text-center">
            <q-input
              v-model="user.name"
              label="Ваше имя"
              :rules="[val => val.length > 2 || 'Минимальная длинна имени - 2 символа']"
            />
            <q-input
              v-model="user.phoneNumber"
              label="Ваш номер телефона"
              type="tel"
              :rules="[val => /\d{10}/.test(val) || 'Введите правильный номер телефона']"
            />
            <q-input
              label="Расскажите о себе"
              v-model="user.about"
              type="textarea"
              autogrow
              :rules="[val => val.length > 0 || 'Поле не может быть пустым']"
            />
            <q-input
              label="Страна"
              v-model="user.address.country"
              :rules="[val => val.length > 0 || 'Поле не может быть пустым']"
            />
            <q-input
              label="Регион"
              v-model="user.address.administrativeArea"
              :rules="[val => val.length > 0 || 'Поле не может быть пустым']"
            />
            <q-input
              label="Населенный пункт"
              v-model="user.address.locality"
              :rules="[val => val.length > 0 || 'Поле не может быть пустым']"
            />
            <q-input
              label="Улица"
              v-model="user.address.street"
              :rules="[val => val.length > 0 || 'Поле не может быть пустым']"
            />
            <q-input
              label="Квартира/дом"
              v-model="user.address.premise"
              :rules="[val => val.length > 0 || 'Поле не может быть пустым']"
            />
            <q-input
              label="Почтовый код"
              v-model="user.address.postalCode"
              :rules="[val => val.length > 0 || 'Поле не может быть пустым']"
            />
            <div>
              <q-btn label="Принять" color="primary"
                     type="submit"/>
              <q-btn label="Удалить аккаунт"
                     color="primary" flat class="q-ml-sm" type="reset"/>
            </div>
          </div>
        </q-form>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { ref } from 'vue';
import { api } from 'boot/axios';
import { useAuthStore } from 'stores/auth';
import { Notify } from 'quasar';

export default {
  name: 'TestComponent',
  setup() {
    const user = ref({
      name: '',
      phoneNumber: '+',
      about: '',
      address: {
        country: '',
        administrativeArea: '',
        locality: '',
        street: '',
        premise: '',
        postalCode: ''
      }
    });

    const userDataForm = ref(null);

    return {
      arrows: ref(true),
      slide: ref('userData'),
      user,
      userDataForm
    };
  },
  created() {
    api.get('/user')
      .then(response => {
        this.updateFormData(response.data);
      })
      .catch(() => {
          Notify.create('Токен истек, перенаправление на страницу авторизации');
          setTimeout(() => this.logout(), 3000);
        }
      );
  },
  methods: {
    async updateUserData() {
      api.put('/user', JSON.stringify(this.user))
        .then(response => {
          this.updateFormData(response.data);
          Notify.create('Успешно');
        })
        .catch(error => Notify.create(error));
    },
    deleteUserData() {
      api.delete('/user')
        .then(response => {
          this.updateFormData(response.data);
          Notify.create('Успешно');
          this.$router.push({ name: 'login' });
        })
        .catch(error => Notify.create(error));
    },
    logout() {
      useAuthStore().logout();
    },
    updateFormData(newUserData) {
      if (newUserData.address != null)
        Object.assign(this.user, newUserData);
      else {
        delete newUserData.address;
        Object.assign(this.user, newUserData);
      }
    }
  }
};
</script>

<style scoped>

</style>
