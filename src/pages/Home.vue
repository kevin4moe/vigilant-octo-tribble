<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue v-on:search="search" />
    <h2-default title="Search" :isTrue="!!searchData" />
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
    <h2-default title="Last Posts in Danbooru" :isTrue="true" />
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
export default {
    name: "PageHome",
    components: {
        FormVue,
        H2Default,
    },
    data() {
        return {
            formData: {
                errors: [],
                name: null,
                tags: null,
                inputs: false,
            },
            searchData: null,
            lastPosts: null,
            config: {
                rating: "s",
            },
        };
    },
    methods: {
        search(tags) {
            tags = tags.join("%20");
            this.searchPosts("searchData", tags, "30");
        },
        searchPosts(section, tags, limit) {
            var url = "https://danbooru.donmai.us/posts.json";
            fetch(
                `${url}?tags=rating:${this.config.rating}%20${tags}&limit=${limit}`
            )
                .then((response) => response.json())
                .then((data) => (this[section] = data))
                .catch((err) => console.log(err));
        },
    },
    mounted() {
        // Query params
        if (this.$route.query.name) {
            this.formData.name = this.$route.query.name;
            this.formData.tags = this.$route.query.tags;
        }
        this.searchPosts("lastPosts", "", "5");
    },
};
</script>

<style></style>
