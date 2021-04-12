<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue
        v-on:search="search"
        v-on:rating="changeRating"
        v-on:page="changePage"
    />
    <aside v-if="!!postData">
        <main class="flex flex-col">
            <aside class="flex flex-row justify-center my-1">
                <button
                    class="mx-1 px-4 py-2 border border-pink-500 rounded bg-pink-100"
                >
                    Post
                </button>
                <button class="mx-1 px-4 py-2 border border-pink-500 rounded">
                    {{ postData.tag_string_copyright }}
                </button>
                <button class="mx-1 px-4 py-2 border border-pink-500 rounded">
                    Artist: {{ postData.tag_string_artist }}
                </button>
            </aside>
            <figure>
                <img
                    class="mx-auto"
                    :src="postData.file_url"
                    :alt="postData.tag_string_character"
                />
            </figure>
            <aside class="px-2">
                <p>
                    <span class="font-bold text-blue-700"> Artist: </span>
                    {{ postData.tag_string_artist }}
                    <span class="font-bold text-yellow-700"> Characters: </span
                    >{{ postData.tag_string_character }}
                </p>
                <p>
                    <span class="font-bold text-pink-700"> Tags: </span
                    >{{ postData.tag_string_general }}
                </p>
            </aside>
        </main>
    </aside>
    <article>
        <h2-default :title="`Page: ${config.page}`" :isTrue="!!searchData" />
        <num-list
            :isShow="!!searchData"
            :pages="config.pages"
            :actualPage="config.page"
            v-on:changePage="changePage"
        />
        <h2-default title="Loading..." :isTrue="postsFetch.isload" />
        <main
            class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-1 my-4"
            v-show="!postsFetch.isload"
        >
            <figure class="mx-auto" v-for="post in searchData" :key="post.id">
                <img
                    :src="post.preview_file_url"
                    :title="`Character(s): ${post.tag_string_character}`"
                    :alt="`Character(s): ${post.tag_string_character}`"
                    @click="searchPostById(post.id)"
                />
            </figure>
        </main>
        <num-list
            :isShow="!!searchData"
            :pages="config.pages"
            :actualPage="config.page"
            v-on:changePage="changePage"
        />
    </article>
    <!-- Last Posts in Danbooru -->
    <article id="favPosts">
        <h2-default title="Last Posts in Danbooru" :isTrue="!!lastPosts" />
        <main
            class="flex flex-row flex-wrap items-baseline justify-around w-full"
        >
            <figure
                class="m-1 border border-pink-100"
                v-for="post in lastPosts"
                :key="post.id"
            >
                <img
                    :src="post.preview_file_url"
                    :title="`Character(s): ${post.tag_string_character}`"
                    :alt="`Character(s): ${post.tag_string_character}`"
                />
                <footer class="h-auto pl-1 pb-1 bg-pink-100 bg-opacity-50">
                    <h3 class="font-bold text-sm text-pink-700">Copyright</h3>
                    <p class="text-xs">{{ post.tag_string_copyright }}</p>

                    <h3 class="font-bold text-sm text-blue-700">Artist</h3>
                    <p class="text-xs">{{ post.tag_string_artist }}</p>
                </footer>
            </figure>
        </main>
    </article>
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
            postData: null,
            searchData: null,
            lastPosts: null,
            config: {
                rating: "s",
                pages: null,
                page: 1,
                url: "https://danbooru.donmai.us",
                tags: "",
            },
            postsFetch: {
                isload: false,
                promise: null,
            },
        };
    },
    methods: {
        search(tags) {
            this.postsFetch.isload = true;
            tags = tags.join("%20");
            this.config.tags = tags;
            this.searchPosts("searchData", 20, tags);
        },
        searchPosts(section, limit, tags) {
            const promise = fetch(
                `${this.config.url}/posts.json?page=${this.config.page}&tags=rating:${this.config.rating}%20${tags}&limit=${limit}`
            )
                .then((response) => response.json())
                .then((data) => (this[section] = data))
                .then(() => (this.postsFetch.isload = false))
                .catch((err) => console.log(err));
            this.postsFetch.promise = promise;
            return new Promise((resolve) => {
                promise.then((result) => {
                    if (promise == this.postsFetch.promise) {
                        this.postsFetch.promise = null;
                        resolve(result);
                    }
                });
            });
        },
        searchPostById(id) {
            fetch(`${this.config.url}/posts/${id}.json`)
                .then((response) => response.json())
                .then((data) => (this.postData = data))
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
            this.searchPosts("searchData", 20, this.config.tags);
        },
        changeRating(rating) {
            this.config.rating = rating;
            this.searchPosts("searchData", 20, this.config.tags);
        },
    },
    mounted() {
        this.actualPage();
        this.searchPosts("lastPosts", 5, "");
    },
};
</script>

<style></style>
