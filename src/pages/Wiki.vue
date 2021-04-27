<template>
    <main class="flex flex-col">
        <sub-title :title="`Post: ${id}`" />
        <wiki-image v-if="!!post" :post="post" @changeView="changeGlob" />
        <nav class="flex flex-row justify-center my-1" ref="menuButtons">
            <button
                v-for="tab in tabs"
                class="mx-1 px-4 py-2 border border-pink-500 rounded bg-pink-100"
                @click="currentTab = tab"
                :key="tab"
            >
                {{ tab }}
            </button>
        </nav>
        <keep-alive>
            <component
                :is="currentTab"
                v-bind="{
                    post: post,
                    artists: wikiFetch.artists,
                }"
            ></component>
        </keep-alive>
    </main>
</template>

<script>
import SubTitle from "@/components/SubTitle.vue";
import WikiImage from "@/components/WikiImage.vue";
import WikiArtist from "@/components/WikiArtist.vue";
import WikiPost from "@/components/WikiPost.vue";
import WikiCopy from "@/components/WikiCopy.vue";
export default {
    name: "PageWiki",
    props: ["id", "url"],
    emits: ["scrollT"],
    components: {
        SubTitle,
        WikiImage,
        WikiArtist,
        WikiPost,
        WikiCopy,
    },
    data: function () {
        return {
            actualId: null,
            post: null,
            wikiFetch: {
                artists: null,
                copyrights: null,
                promise: null,
            },
            currentTab: "WikiPost",
            tabs: ["WikiPost", "WikiArtist"],
        };
    },
    methods: {
        searchWikiByTags(wiki, searchValue, name) {
            const promiseWiki = fetch(
                `${this.url}/${wiki}.json?search[name]=${searchValue}&limit=1`
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
                        this.$emit("scrollT", "wikiPages");
                    }
                });
            });
        },
        searchPostById(id) {
            fetch(`${this.url}/posts/${id}.json`)
                .then((response) => response.json())
                .then((data) => (this.post = data))
                .then(() =>
                    this.searchWikiByTags(
                        "artist_versions",
                        this.post.tag_string_artist,
                        "artists"
                    )
                )
                .catch((err) => console.log(err));
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
    created() {
        this.searchPostById(this.id);
        this.actualId = this.id;
    },
    updated() {
        if (this.actualId !== this.id) {
            this.searchPostById(this.id);
            this.actualId = this.id;
        }
    },
};
</script>
