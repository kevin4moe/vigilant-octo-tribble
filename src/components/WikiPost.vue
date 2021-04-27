<template>
    <article v-if="!!post">
        <span class="font-bold text-blue-700"> Artist: </span>
        <button
            class="p-2 bg-blue-100 hover:bg-blue-200 rounded underline"
            @click="searchPosts('searchData', 20, post.tag_string_artist)"
        >
            {{ post.tag_string_artist }}
        </button>
        <span class="font-bold text-yellow-700"> Characters: </span
        ><button
            class="mx-1 p-2 bg-yellow-100 hover:bg-yellow-200 rounded underline"
            v-for="char in post.tag_string_character.split(' ')"
            @click="searchPosts('searchData', 20, char)"
            :key="char"
        >
            {{ char }}
        </button>
        <span class="font-bold text-pink-700"> Tags: </span>
        <button
            class="p-2 hover:bg-pink-100 rounded underline"
            v-for="tag in post.tag_string_general.split(' ')"
            @click="searchPosts('searchData', 20, tag)"
            :key="tag"
        >
            {{ tag }}
        </button>
    </article>
</template>

<script>
export default {
    name: "WikiPost",
    props: ["post"],
};
</script>
