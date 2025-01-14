import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from '@/router/router';
import App from '@/App.vue';
import { createToast } from '@/services/toastService.ts';

const { toasts, addToast } = createToast();
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.provide('toasts', toasts);
app.provide('addToast', addToast);

app.mount('#app');
