<template>
  <q-layout view="lhr lpR fff"
            class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:560px;">
          <q-card-section class="bg-accent">
            <h4 class="text-h5 text-white q-my-md">Регистрация</h4>
          </q-card-section>
          <q-card-section>
            <q-form ref="registerForm" class="q-px-sm q-pt-xl q-pb-lg">
              <q-input
                filled
                v-model="user.email"
                label="Адрес почты"
                lazy-rules
                type="email"
                :rules="[val => /.+@.+/.test(val) || 'Введите почту правильно']"
              />
              <q-input
                filled
                v-model="user.password"
                label="Пароль"
                lazy-rules
                type="password"
                :rules="[val => val.length >= 6 && val.length <= 64 || 'Пароль должен содержать от 6 до 32 символов']"
              />
              <q-input
                filled
                v-model="passwordConfirmation"
                label="Подтверждение пароля"
                lazy-rules
                type="password"
                :rules="[val => user.password === passwordConfirmation || 'Пароли не совпадают']"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn v-on:click="register" unelevated size="lg" color="purple-4" class="full-width text-white"
                   label="Зарегистрироваться" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p v-on:click="this.$router.push({name: 'login'})" class="text-grey-6">Перейти к входу</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { useAuthStore } from 'stores/auth';
import { Notify } from 'quasar';
import { ref } from 'vue';

export default {
  name: 'RegisterLayout',
  setup() {
    const registerForm = ref(null);

    async function validate() {
      return registerForm.value.validate().then(success => {
        if (!success) {
          throw new Error();
        }
      });
    }

    return {
      registerForm,
      validate
    };
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
      },
      passwordConfirmation: ''
    };
  },
  methods: {
    async register() {
      if (this.user.password !== this.passwordConfirmation) {
        Notify.create('Пароли не совпадают');
        return;
      }
      this.validate()
        .then(() => useAuthStore().register(this.user))
        .catch(() => Notify.create('Не все поля заполнены верно'))
    }
  }
};
</script>

<style scoped>

</style>
