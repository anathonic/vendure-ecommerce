import { createApp } from 'vue'
import './assets/css/tailwind.css'
import App from './App.vue'
import router from "./router";

createApp(App).use(router).mount('#app')
