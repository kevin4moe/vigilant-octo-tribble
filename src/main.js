import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";

import PageHome from "@/pages/Home";
import ThreadShow from "@/pages/ThreadShow";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: PageHome,
        props: (route) => ({ query: route.query.q }),
    },
    {
        path: "/thread/:id",
        name: "Thread Show",
        component: ThreadShow,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const forumApp = createApp(App);
forumApp.use(router);
forumApp.mount("#app");
