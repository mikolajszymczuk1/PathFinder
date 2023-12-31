import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library, type IconDefinition } from '@fortawesome/fontawesome-svg-core';
import iconsToLoad from '@/modules/fontawesomeIcons/iconLibrary';
import { type Preview, setup } from "@storybook/vue3";
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import VueTippy from 'vue-tippy';
import type { App } from 'vue';
import { createPinia } from 'pinia';
import '../src/assets/css/index.css';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/material.css';
import 'tippy.js/animations/shift-away.css'

library.add(...iconsToLoad as IconDefinition[]);

const pinia = createPinia();

setup((app: App) => {
  app.use(pinia);
  app.use(VueTippy);
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
    viewport: {
      viewports: INITIAL_VIEWPORTS,
    },
    docs: {
      toc: true,
    },
    backgrounds: {
      default: 'white',
      values: [
        {
          name: 'white',
          value: '#FFFFFF',
        },
        {
          name: 'dark',
          value: '#787878',
        }
      ],
    },
  },
};

export default preview;
