import { api } from 'boot/axios';
import { useAuthStore } from 'stores/auth';

export function setContentTypeJSON(){
  api.defaults.headers.common['Content-Type'] = 'application/json';
  api.defaults.headers.post['Content-Type'] = 'application/json';
  api.defaults.headers.put['Content-Type'] = 'application/json';
  api.defaults.headers.delete['Content-Type'] = 'application/json';
}

export function setAuthHeaderEmpty() {
  api.defaults.headers.common.Authorization = '';
  api.defaults.headers.common.Authorization = '';
  api.defaults.headers.common.Authorization = '';
  api.defaults.headers.common.Authorization = '';
}

export function setAuthHeader() {
  api.defaults.headers.common.Authorization = 'Bearer ' + useAuthStore().token;
  api.defaults.headers.post.Authorization = 'Bearer ' + useAuthStore().token;
  api.defaults.headers.put.Authorization = 'Bearer ' + useAuthStore().token;
  api.defaults.headers.delete.Authorization = 'Bearer ' + useAuthStore().token;
}
