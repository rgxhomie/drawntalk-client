import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

import'../node_modules/bootstrap/dist/css/bootstrap.css';
import Notifications from '@kyvg/vue3-notification';
import $bus from './utils/Events';

const app = createApp(App);

app.use(router);
app.use(Notifications);
app.config.globalProperties.$bus = $bus;
app.config.globalProperties.$HOST_BASE_URL = 'https://drawntalk.onrender.com';

app.mount('#app');