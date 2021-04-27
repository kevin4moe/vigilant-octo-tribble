<template>
    <h3 class="my-8 text-center text-2xl">
        Search, Like and Follow your favorites loles.
    </h3>
    <form-vue @search="searchPostByTags" />
    <article ref="imageBoard" v-if="!!searchData">
        <sub-title title="name" />
        <num-list-grid
            :allPagesArray="pageInitials.pageUntil"
            v-model:viewPagesArray="pageInitials.pagesArray"
            v-model:currentPage="pageInitials.pageIn"
            v-model:lastPage="pageInitials.pageLast"
            @searchPage="changeContentByPage"
        />
        <image-board-grid
            :postsObject="searchData"
            @searchWiki="searchWikiById"
        />
        <num-list-grid
            :allPagesArray="pageInitials.pageUntil"
            v-model:viewPagesArray="pageInitials.pagesArray"
            v-model:currentPage="pageInitials.pageIn"
            v-model:lastPage="pageInitials.pageLast"
            @searchPage="changeContentByPage"
        />
    </article>
    <aside ref="wikiPages" v-if="!!postId">
        <wiki :id="postId" :url="config.url" @scrollT="scrollMeTo" />
    </aside>
    <!-- Last Posts in Danbooru -->
    <aside>
        <image-board :url="config.url" />
    </aside>
</template>

<script>
import FormVue from "@/components/Form.vue";
import SubTitle from "@/components/SubTitle.vue";
import NumListGrid from "@/components/NumListGrid.vue";
import ImageBoard from "@/components/ImageBoard.vue";
import ImageBoardGrid from "@/components/ImageBoardGrid.vue";
import Wiki from "@/pages/Wiki.vue";
export default {
    name: "PageHome",
    props: ["rating"],
    components: {
        FormVue,
        SubTitle,
        NumListGrid,
        ImageBoard,
        ImageBoardGrid,
        Wiki,
    },
    data() {
        return {
            postId: null,
            searchData: null,
            postsFetch: {
                isload: false,
                promise: null,
            },
            pageInitials: {
                pageUntil: Array,
                pagesArray: Array,
                pageIn: 1,
                pageLast: 15,
                pagesNumber: 8,
            },
            config: {
                page: 1,
                url: "https://danbooru.donmai.us",
                tags: "",
            },
        };
    },
    methods: {
        searchPosts(section, limit, tags) {
            const promise = fetch(
                `${this.config.url}/posts.json?page=${this.config.page}&tags=rating:${this.rating}%20${tags}&limit=${limit}`
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
                        this.scrollMeTo("imageBoard");
                    }
                });
            });
        },
        actualPage(postCount) {
            this.pageInitials.pageIn = 1;
            this.pageInitials.pageLast = Math.ceil(postCount[0] / 20);
            if (this.pageInitials.pageLast > 1000) {
                this.pageInitials.pageLast = 1000;
            }
            this.pageInitials.pageUntil = Array.from(
                { length: this.pageInitials.pageLast },
                (_, i) => i + 1
            );
            this.pageInitials.pagesArray = this.pageInitials.pageUntil.slice(
                0,
                7
            );
        },
        searchPostByTags(tags) {
            this.postsFetch.isload = true;
            !tags.tagsArray
                ? (this.config.tags = "")
                : (this.config.tags = tags.tagsArray.join("%20"));
            this.actualPage(tags.postCount);
            this.searchPosts("searchData", 20, this.config.tags);
        },
        changeContentByPage(page) {
            this.config.page = page;
            this.searchPosts("searchData", 20, this.config.tags);
        },
        searchWikiById(id) {
            this.postId = Number(id);
        },
        scrollMeTo(refName) {
            console.log("ref", refName);
            var element = this.$refs[refName];
            console.log("element", element);
            var top = element.offsetTop;

            window.scrollTo(0, top);
        },
    },
};
</script>

<style></style>
