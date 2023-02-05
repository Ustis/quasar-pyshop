<template>
  <q-layout view="lhr lpR fff"
            class="window-height window-width row justify-center items-center">
    <div class="column q-pa-lg">
      <div class="row">
        <q-card square class="shadow-24" style="width:300px;height:485px;">
          <q-card-section class="bg-accent">
            <h4 class="text-h5 text-white q-my-md">Вход</h4>
          </q-card-section>
          <q-card-section>
            <q-form ref="loginForm" class="q-px-sm q-pt-xl">
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
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-lg">
            <q-btn v-on:click="login" unelevated size="lg" color="purple-4" class="full-width text-white"
                   label="Войти" />
          </q-card-actions>
          <q-card-section class="text-center q-pa-sm">
            <p v-on:click="this.$router.push({name: 'register'})" class="text-grey-6">Перейти к регистрации</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-layout>
</template>

<script>
import { useAuthStore } from 'stores/auth';
import { ref } from 'vue';
import { Notify } from 'quasar';

export default {
  name: 'LoginLayout',
  setup() {
    const loginForm = ref(null);

    async function validate() {
      return loginForm.value.validate().then(success => {
        if (!success) {
          throw new Error();
        }
      });
    }

    return {
      loginForm,
      validate
    };
  },
  data() {
    return {
      user: {
        email: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      this.validate()
        .then(() => useAuthStore().login(this.user))
        .catch(() => Notify.create('Не все поля заполнены верно'))
    }
  }
};
</script>

<style scoped>

</style>
