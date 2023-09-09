import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { EDITOR_CONST } from '@/modules/consts/editorConst';
import iconsToLoad from '@/modules/fontawesomeIcons/iconLibrary';
import Toast, { type PluginOptions } from 'vue-toastification';
import App from './App.vue';
import './assets/css/index.css';
import './assets/css/customToastsStyles.css';
import 'vue-toastification/dist/index.css';

const app = createApp(App);

library.add(...iconsToLoad);

const options: PluginOptions = {
  hideProgressBar: true,
  timeout: 1800,
  toastClassName: EDITOR_CONST.TOAST.MAIN_CLASS,
  bodyClassName: EDITOR_CONST.TOAST.BODY_CLASS,
};

// Plugins
app.use(createPinia());
app.use(Toast, options);

/** Usage example: <FontAwesomeIcon :icon="['fas', 'play']" */
app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
