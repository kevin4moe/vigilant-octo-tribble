<template>
    <main>
        <figure>
            <img
                class="mx-auto"
                :src="post.preview_file_url"
                :alt="post.tag_string_character"
                @click="$event.target.src = post.file_url"
            />
            <a
                class="block mb-4 bg-pink-100 text-center"
                :href="
                    post.large_file_url ? post.large_file_url : post.file_url
                "
                target="_blank"
                rel="noopener noreferrer"
                v-show="post.file_url"
            >
                See full image.
            </a>
        </figure>
    </main>
</template>

<script>
export default {
    name: "Wiki",
    props: ["post"],
};
</script>
