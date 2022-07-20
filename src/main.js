import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'


import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App)

app.use(createPinia())

app.component('QuillEditor', QuillEditor)

app.mount('#app')
