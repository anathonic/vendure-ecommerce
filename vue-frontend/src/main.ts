import App from './App.vue'
import router from "./router";
import { createApp } from 'vue'
import './assets/css/tailwind.css'
import apolloClient from './graphql/apolloClient'
import { provideApolloClient } from '@vue/apollo-composable'

provideApolloClient(apolloClient)

createApp(App).use(router).mount('#app')
