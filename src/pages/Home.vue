<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue />
    <!-- Favorite Posts -->
    <h2
        class="my-8 border-b-2 border-pink-100 text-pink-500 text-center text-3xl"
    >
        Favorite Posts
    </h2>
    <div class="flex flex-row justify-around w-full" id="favPosts">
        <div class="" v-for="post in jsonData.favoritePosts" :key="post.id">
            <img :src="post.url" alt="" srcset="" />
        </div>
    </div>
</template>

<script>
import formVue from "@/components/Form.vue";
import sourceData from "@/dataL.json";
export default {
    name: "PageHome",
    components: {
        formVue,
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
        };
    },
    computed: {
        arraytoString() {
            return this.tags.toString();
        },
    },
    methods: {
        postById(postId) {
            return this.jsonData.posts.find((p) => p.id === postId);
        },
        userById(userId) {
            return this.jsonData.users.find((p) => p.id === userId);
        },
        checkForm(e) {
            if (this.formData.tags) {
                return true;
            }
            this.formData.errors = [];
            if (!this.formData.tags) {
                this.formData.errors.push(
                    "No olvides escribir lo que quieres buscar."
                );
            }

            e.preventDefault();
        },
        resetFormValues() {
            this.formData.name = null;
            this.formData.tags = null;
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
