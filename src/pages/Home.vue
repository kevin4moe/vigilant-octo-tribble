<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue
        v-on:search="searchPostByTags"
        v-on:rating="changeRating"
        v-on:page="changePage"
    />
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
    <aside v-if="!!postData">
        <h2-default :title="`Post: ${postData.id}`" :isTrue="!!searchData" />
        <main class="flex flex-col">
            <figure>
                <img
                    class="mx-auto"
                    :src="postData.preview_file_url"
                    :alt="postData.tag_string_character"
                    @click="$event.target.src = postData.file_url"
                />
                <a
                    class="block mb-4 bg-pink-100 text-center"
                    :href="
                        postData.large_file_url
                            ? postData.large_file_url
                            : postData.file_url
                    "
                    target="_blank"
                    rel="noopener noreferrer"
                    v-show="postData.file_url"
                >
                    See full image.
                </a>
            </figure>
            <aside class="flex flex-row justify-center my-1" ref="menuButtons">
                <button
                    class="mx-1 px-4 py-2 border border-pink-500 rounded bg-pink-100"
                    @click="changeGlob('posts')"
                >
                    Post
                </button>
                <button
                    class="mx-1 px-4 py-2 border border-pink-500 rounded"
                    @click="changeGlob('copyright')"
                >
                    {{ postData.tag_string_copyright }}
                </button>
                <button
                    class="mx-1 px-4 py-2 border border-pink-500 rounded"
                    @click="changeGlob('artists')"
                >
                    Artist: {{ postData.tag_string_artist }}
                </button>
            </aside>
            <article ref="menuCopyright"></article>
            <article
                ref="menuArtists"
                hidden
                v-if="!!wikiFetch.artists.artist_id"
            >
                <h3 class="my-2 text-xl font-bold">
                    <span class="text-pink-500">Artist:</span>

                    <span
                        class="mx-1 px-1 border border-blue-500 rounded text-blue-300"
                    >
                        {{ wikiFetch.artists.name }}</span
                    >
                </h3>
                <h4 class="my-2 text-lg font-bold text-pink-500">
                    Other names
                </h4>
                <span
                    class="mx-1 my-2 px-1 border border-pink-500 rounded text-pink-300"
                    v-for="name in wikiFetch.artists.other_names"
                    :key="name"
                >
                    {{ name }}
                </span>
                <h4 class="my-2 text-lg font-bold text-pink-500">URL</h4>
                <ul>
                    <li v-for="url in wikiFetch.artists.urls" :key="url">
                        <a
                            class="mx-1 my-2 px-1 text-pink-900"
                            :class="{
                                'line-through text-opacity-50 cursor-not-allowed': url.startsWith(
                                    '-'
                                ),
                            }"
                            :href="url"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {{ url }}
                        </a>
                    </li>
                </ul>
            </article>
            <article ref="menuPosts">
                <p>
                    <span class="font-bold text-blue-700"> Artist: </span>
                    <button
                        class="p-2 bg-blue-100 hover:bg-blue-200 rounded underline"
                        @click="
                            searchPosts(
                                'searchData',
                                20,
                                postData.tag_string_artist
                            )
                        "
                    >
                        {{ postData.tag_string_artist }}
                    </button>

                    <span class="font-bold text-yellow-700"> Characters: </span
                    ><button
                        class="p-2 bg-yellow-100 hover:bg-yellow-200 rounded underline"
                        @click="
                            searchPosts(
                                'searchData',
                                20,
                                postData.tag_string_character
                            )
                        "
                    >
                        {{ postData.tag_string_character }}
                    </button>
                </p>
                <p>
                    <span class="font-bold text-pink-700"> Tags: </span>
                    <button
                        class="p-2 hover:bg-pink-100 rounded underline"
                        v-for="tag in postData.tag_string_general.split(' ')"
                        @click="searchPosts('searchData', 20, tag)"
                        :key="tag"
                    >
                        {{ tag }}
                    </button>
                </p>
            </article>
        </main>
    </aside>
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
            wikiFetch: {
                artists: null,
                copyrights: null,
                promise: null,
            },
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
        searchPostByTags(tags) {
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
        searchWikiPageByTags(wiki, searchValue, name) {
            const promiseWiki = fetch(
                `${this.config.url}/${wiki}.json?search[name]=${searchValue}&limit=1`
            )
                .then((response) => response.json())
                .then((data) => (this.wikiFetch[name] = data[0]))
                .catch((err) => console.log(err));
            this.wikiFetch.promise = promiseWiki;
            return new Promise((resolve) => {
                promiseWiki.then((result) => {
                    if (promiseWiki == this.wikiFetch.promise) {
                        this.wikiFetch.promise = null;
                        resolve(result);
                    }
                });
            });
        },
        searchPostById(id) {
            fetch(`${this.config.url}/posts/${id}.json`)
                .then((response) => response.json())
                .then((data) => (this.postData = data))
                .then(() =>
                    this.searchWikiPageByTags(
                        "artist_versions",
                        this.postData.tag_string_artist,
                        "artists"
                    )
                )
                .catch((err) => console.log(err));
        },
        actualPage() {
            if (this.config.page > 5) {
                this.config.pages = Array.from(
                    { length: 10 },
                    (_, i) => i + this.config.page - 4
                );
            } else {
                this.config.pages = Array.from({ length: 10 }, (_, i) => i + 1);
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
        changeGlob(value) {
            console.log(this.$refs.menuButtons);
            switch (value) {
                case "copyright":
                    this.$refs.menuCopyright.hidden = false;
                    this.$refs.menuArtists.hidden = true;
                    this.$refs.menuPosts.hidden = true;
                    break;
                case "artists":
                    this.$refs.menuCopyright.hidden = true;
                    this.$refs.menuArtists.hidden = false;
                    this.$refs.menuPosts.hidden = true;
                    break;
                case "posts":
                    this.$refs.menuCopyright.hidden = true;
                    this.$refs.menuArtists.hidden = true;
                    this.$refs.menuPosts.hidden = false;
                    break;
                default:
                    break;
            }
        },
    },
    mounted() {
        this.actualPage();
        this.searchPosts("lastPosts", 5, "");
    },
};
</script>

<style></style>
