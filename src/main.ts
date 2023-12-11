import { createApp } from "vue";
import "@vueform/multiselect/themes/default.css";
import "./style.css";
import App from "./App.vue";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import { BiPlusSquare, BiTrashFill, BiCardImage } from "oh-vue-icons/icons";
import Multiselect from "@vueform/multiselect";

addIcons(BiPlusSquare, BiTrashFill, BiCardImage);

const app = createApp(App);
app.component("V-icon", OhVueIcon);
app.component("Multi-select", Multiselect);

app.mount("#app");
