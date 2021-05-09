<template>
    <main class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-1 my-4">
        <figure class="mx-auto" v-for="post in postsObject" :key="post.id">
            <img
                v-if="post.preview_file_url"
                :src="post.preview_file_url"
                :title="`Character(s):
            ${post.tag_string_character}`"
                :alt="`Character(s):
            ${post.tag_string_character}`"
                @click="$emit('searchWiki', post.id)"
            />
        </figure>
    </main>
</template>

<script>
export default {
    name: "ImageBoard",
    props: ["postsObject"],
    emits: ["searchWiki"],
};
</script>
