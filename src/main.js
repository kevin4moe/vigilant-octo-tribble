import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import PageHome from "@/pages/Home";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: PageHome,
        props: (route) => ({ query: route.query.q }),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const forumApp = createApp(App);
forumApp.use(router);
forumApp.mount("#app");
