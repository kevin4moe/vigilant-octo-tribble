<template>
    <main>
        <sub-title title="Last Posts in Danbooru" />
        <nav
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
                <figcaption class="h-auto pl-1 pb-1 bg-pink-100 bg-opacity-50">
                    <h3 class="font-bold text-sm text-pink-700">Copyright</h3>
                    <p class="text-xs">{{ post.tag_string_copyright }}</p>

                    <h3 class="font-bold text-sm text-blue-700">Artist</h3>
                    <p class="text-xs">{{ post.tag_string_artist }}</p>
                </figcaption>
            </figure>
        </nav>
    </main>
</template>

<script>
import SubTitle from "@/components/SubTitle.vue";
export default {
    name: "ImageBoard",
    components: { SubTitle },
    props: ["url"],
    data: function () {
        return {
            lastPosts: null,
        };
    },
    methods: {
        searchPosts(limit) {
            fetch(`${this.url}/posts.json?page=1&tags=rating:s&limit=${limit}`)
                .then((response) => response.json())
                .then((data) => (this.lastPosts = data))
                .catch((err) => console.log(err));
        },
    },
    mounted() {
        this.searchPosts(5);
    },
};
</script>
