<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue v-on:dataSend="saveData" />
    <h2-default title="Search" />
    <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-1">
        <div class="mx-auto" v-for="post in searchData" :key="post.id">
            <img
                :src="post.preview_file_url"
                :title="`Character(s): ${post.tag_string_character}`"
                :alt="`Character(s): ${post.tag_string_character}`"
            />
        </div>
    </div>
    <!-- Last Posts in Danbooru -->
    <h2-default title="Last Posts in Danbooru" />
    <div class="flex flex-row flex-wrap justify-around w-full" id="favPosts">
        <div class="m-1" v-for="post in lastPosts" :key="post.id">
            <img
                :src="post.preview_file_url"
                :title="`Character(s): ${post.tag_string_character}`"
                :alt="`Character(s): ${post.tag_string_character}`"
            />
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
            lastPosts: null,
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
        searchPosts() {
            fetch(`https://danbooru.donmai.us/posts.json?tags=rating:s&limit=5`)
                .then((response) => response.json())
                .then((data) => (this.lastPosts = data))
                .catch((err) => console.log(err));
        },
    },
    mounted() {
        // Query params
        if (this.$route.query.name) {
            this.formData.name = this.$route.query.name;
            this.formData.tags = this.$route.query.tags;
        }
        this.searchPosts();
    },
};
</script>

<style></style>
