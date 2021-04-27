<template>
    <div class="bg-white">
        <header-default v-model:rating="rating" />
        <div class="container flex flex-col mx-auto">
            <router-view :rating="rating" />
        </div>
    </div>
</template>

<script>
import HeaderDefault from "@/header/main.vue";
export default {
    name: "App",
    components: { HeaderDefault },
    data: function () {
        return {
            rating: "s",
        };
    },
};
</script>

<style></style>
