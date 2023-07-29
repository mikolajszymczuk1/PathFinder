import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import iconsToLoad from '@/modules/fontawesomeIcons/iconLibrary';
import { type Preview, setup } from "@storybook/vue3";
import type { App } from 'vue';
import { createPinia } from 'pinia';
import '../src/assets/css/index.css';

library.add(...iconsToLoad);

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
  app.component('FontAwesomeIcon', FontAwesomeIcon);
});

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      toc: true,
    },
  },
};

export default preview;
