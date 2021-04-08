<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue v-on:dataSend="saveData" />
    <h2-default title="Search" />
    <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-1">
        <div class="mx-auto" v-for="post in searchData" :key="post.id">
            <img :src="post.preview_file_url" alt="" srcset="" />
        </div>
    </div>
    <!-- Favorite Posts -->
    <h2-default title="Favorite Posts" />
    <div class="flex flex-row flex-wrap justify-around w-full" id="favPosts">
        <div class="m-1" v-for="post in jsonData.favoritePosts" :key="post.id">
            <img :src="post.url" alt="" srcset="" />
        </div>
    </div>
</template>

<script>
import FormVue from "@/components/Form.vue";
import H2Default from "@/components/h2.vue";
import sourceData from "@/dataL.json";
export default {
    name: "PageHome",
    components: {
        FormVue,
        H2Default,
    },
    data() {
        return {
            jsonData: {
                threads: sourceData.threads,
                posts: sourceData.posts,
                users: sourceData.users,
                favoritePosts: sourceData.stats.favoritePosts,
            },
            formData: {
                errors: [],
                name: null,
                tags: null,
                inputs: false,
            },
            searchData: null,
        };
    },
    methods: {
        postById(postId) {
            return this.jsonData.posts.find((p) => p.id === postId);
        },
        userById(userId) {
            return this.jsonData.users.find((p) => p.id === userId);
        },
        saveData(data) {
            this.searchData = data;
        },
    },
    mounted() {
        // Query params
        if (this.$route.query.name) {
            this.formData.name = this.$route.query.name;
            this.formData.tags = this.$route.query.tags;
        }
        this.jsonData.favoritePosts = this.jsonData.favoritePosts.map((f) =>
            this.postById(f)
        );
        // y.filter(item => item.charNames.toString().search("r") > -1)
    },
};
</script>

<style></style>
