<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue
        v-on:search="search"
        v-on:rating="changeRating"
        v-on:page="changePage"
    />
    <h2-default title="Search" :isTrue="!!searchData" />
    <num-list
        :isShow="!!searchData"
        :pages="config.pages"
        :actualPage="config.page"
        v-on:changePage="changePage"
    />
    <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-1 my-4">
        <div class="mx-auto" v-for="post in searchData" :key="post.id">
            <img
                :src="post.preview_file_url"
                :title="`Character(s): ${post.tag_string_character}`"
                :alt="`Character(s): ${post.tag_string_character}`"
            />
        </div>
    </div>
    <num-list
        :isShow="!!searchData"
        :pages="config.pages"
        :actualPage="config.page"
        v-on:changePage="changePage"
    />
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
import NumList from "@/components/NumList.vue";
export default {
    name: "PageHome",
    components: {
        FormVue,
        H2Default,
        NumList,
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
                pages: null,
                page: 1,
                url: "https://danbooru.donmai.us/posts.json",
                tags: "",
            },
        };
    },
    methods: {
        search(tags) {
            tags = tags.join("%20");
            this.config.tags = tags;
            this.searchPosts("searchData", tags, "20");
        },
        searchPosts(
            section = "searchData",
            limit = 20,
            tags = this.config.tags
        ) {
            fetch(
                `${this.config.url}?page=${this.config.page}&tags=rating:${this.config.rating}%20${tags}&limit=${limit}`
            )
                .then((response) => response.json())
                .then((data) => (this[section] = data))
                .catch((err) => console.log(err));
        },
        actualPage() {
            this.config.pages = Array.from({ length: 10 }, (_, i) => i + 1);
            if (this.config.page > 10) {
                this.config.pages = Array.from(
                    { length: 10 },
                    (_, i) => i + 10
                );
            } else if (this.config.page > 4) {
                this.config.pages = Array.from(
                    { length: 10 },
                    (_, i) => i + this.config.page
                );
            }
        },
        changePage(page) {
            this.config.page = page;
            this.actualPage();
            this.searchPosts();
        },
        changeRating(rating) {
            this.config.rating = rating;
            this.searchPosts();
        },
    },
    mounted() {
        this.actualPage();
        this.searchPosts("lastPosts", "5");
    },
};
</script>

<style></style>
