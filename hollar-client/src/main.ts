import './assets/main.css'
import { createApp, provide, h } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { apolloClient } from './Apollo';
import vueCountryRegionSelect from 'vue3-ts-country-region-select'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { VeeValidatePlugin } from "./includes/validation"
import { EmojiPicker } from 'vue-emoji-picker'
import VueTribute from 'vue-tribute'


const app = createApp({
    setup() {
        provide(DefaultApolloClient, apolloClient)
    },

    render: () => h(App),
})




// const app = createApp(App)
app.component(EmojiPicker)
app.use(vueCountryRegionSelect);
app.use(VueTribute)
app.use(VeeValidatePlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
