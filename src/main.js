import './assets/main.css'
import './assets/styles.css'

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { VueShortkey } from 'vue-shortkey';



const app = createApp(App)

app.use(router);
app.use(store);
app.use(VueShortkey);

app.mount('#app')
