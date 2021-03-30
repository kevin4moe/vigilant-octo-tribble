<template>
    <div>Search, Like and Follow your favorites lolis.</div>
    <hr />
    <div v-for="post in favoritePosts" :key="post.id">
        <img :src="post.url" alt="" srcset="" />
    </div>
</template>

<script>
import sourceData from "@/dataL.json";
export default {
    data() {
        return {
            threads: sourceData.threads,
            posts: sourceData.posts,
            users: sourceData.users,
            favoritePosts: sourceData.stats.favoritePosts,
        };
    },
    methods: {
        postById(postId) {
            return this.posts.find((p) => p.id === postId);
        },
        userById(userId) {
            return this.users.find((p) => p.id === userId);
        },
    },
    mounted() {
        this.favoritePosts = this.favoritePosts.map((f) => this.postById(f));
    },
};
</script>

<style></style>
