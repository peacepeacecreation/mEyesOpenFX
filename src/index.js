import { createApp } from 'vue'
import App from './App.vue'
import VueSelect from "vue-select";

const app = createApp(App)
app.component("v-select", VueSelect)

app.mount('#app')
