import VueSplide from '@splidejs/vue-splide';
import { boot } from 'quasar/wrappers';

import '@splidejs/vue-splide/css';
export default boot(async ({ app }) => {
  app.use(VueSplide);
});
