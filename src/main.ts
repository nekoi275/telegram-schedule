import { createApp } from "vue"
import { createPinia } from 'pinia'
import router from './router'
import "@vueform/multiselect/themes/default.css"
import "./style.css"
import App from "./App.vue"
import { OhVueIcon, addIcons } from "oh-vue-icons"
import { BiTrashFill, BiCardImage, BiTelegram, MdModeeditoutline, LaSave, IoExitOutline, BiArrowLeftSquare, BiArrowRightSquare } from "oh-vue-icons/icons"
import Multiselect from "@vueform/multiselect"

addIcons(BiTelegram, BiTrashFill, BiCardImage, MdModeeditoutline, LaSave, IoExitOutline, BiArrowLeftSquare, BiArrowRightSquare)

const app = createApp(App)
const pinia = createPinia()
app.component("V-icon", OhVueIcon)
app.component("Multi-select", Multiselect)
app.use(pinia)
app.use(router)

app.mount("#app")
