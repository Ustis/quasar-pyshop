import { boot } from 'quasar/wrappers'
import { useAuthStore } from 'stores/auth';

export default boot(({ store, router }) => {
  const authStore = useAuthStore(store)
  router.beforeEach((to) => {
    if (to.meta.requiresAuth && !authStore.isAuthorized)
        return { name: 'login'}
  })
});
