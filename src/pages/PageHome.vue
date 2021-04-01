<template>
    <span>Search, Like and Follow your favorites lolis.</span>
    <hr />
    <form id="app-form" @submit="checkForm" action="/" method="get">
        <div v-if="formData.errors.length">
            <ul>
                <li v-for="(error, index) in formData.errors" :key="index">
                    <b>{{ error }}</b>
                </li>
            </ul>
        </div>
        <div>
            <label for="name">Name</label>
            <input id="name" v-model="formData.name" type="text" name="name" />
        </div>
        <div>
            <label for="name">Tags</label>
            <input id="tags" v-model="formData.tags" type="text" name="tags" />
        </div>
        <div>
            <input type="submit" value="Update" />
        </div>
    </form>
    <div class="bg-red-600">
        Character: {{ formData.name }}
        <br />
        Tags: {{ formData.tags }}
    </div>
    <!-- Favorite Posts -->
    <div v-for="post in jsonData.favoritePosts" :key="post.id">
        <img :src="post.url" alt="" srcset="" />
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
