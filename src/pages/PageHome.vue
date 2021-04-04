<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form
        class="flex flex-col sm:flex-row mx-auto mb-1"
        id="app-form"
        @submit="checkForm"
        action="/"
        method="get"
    >
        <div v-if="formData.errors.length">
            <p v-for="(error, index) in formData.errors" :key="index">
                <b>{{ error }}</b>
            </p>
        </div>
        <input
            class="m-1 p-2 border rounded-full border-pink-500 placeholder-pink-600 placeholder-opacity-50 font-semibold"
            id="name"
            v-model="formData.name"
            type="search"
            name="name"
            placeholder="Character Name"
        />
        <input
            class="m-1 p-2 border rounded-full border-pink-500 placeholder-pink-600 placeholder-opacity-50 font-semibold"
            id="tags"
            v-model="formData.tags"
            type="search"
            name="tags"
            placeholder="Tags"
        />
        <div class="m-auto" id="form-buttons">
            <input
                class="mx-1 p-2 bg-white hover:bg-pink-500 active:bg-pink-800 border border-pink-500 rounded-full font-semibold text-pink-500 hover:text-white"
                type="button"
                value="Refresh"
                @click="resetFormValues"
            />
            <input
                class="mx-1 p-2 bg-pink-500 active:bg-white border border-pink-500 rounded-full font-semibold text-white"
                type="submit"
                value="Update"
            />
        </div>
    </form>
    <div v-show="formData.name || formData.tags">
        {{ formData.name }}
        <br />
        {{ formData.tags }}
    </div>
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
import sourceData from "@/dataL.json";
export default {
    name: "PageHome",
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
