import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import iconsToLoad from '@/modules/fontawesomeIcons/iconLibrary';
import App from './App.vue';
import './assets/css/index.css';

const app = createApp(App);

library.add(...iconsToLoad);

app.use(createPinia());

/** Usage example: <FontAwesomeIcon :icon="['fas', 'play']" */
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
