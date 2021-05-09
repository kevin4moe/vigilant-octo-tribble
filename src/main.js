import { createApp, defineAsyncComponent } from "vue";
import App from "./App.vue";
import "./index.css";

import PageHome from "@/pages/Home";
import { createRouter, createWebHistory } from "vue-router";
import "./registerServiceWorker";

const routes = [
    {
        path: "/",
        name: "Home",
        component: PageHome,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const AsyncComp = defineAsyncComponent(() => {
    import("@/components/WikiArtist.vue");
    import("@/components/WikiImage.vue");
    import("@/components/WikiPost.vue");
});

const forumApp = createApp(App);
forumApp.component("async-component", AsyncComp);
forumApp.use(router);
forumApp.mount("#app");
