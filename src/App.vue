<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useAuthStore } from 'stores/auth';
import { setContentTypeJSON } from 'src/helpers/interceptor-setter';

export default defineComponent({
  name: 'App',
  beforeCreate() {
    setContentTypeJSON();
    useAuthStore().tokenVerification();
  }
});
</script>
