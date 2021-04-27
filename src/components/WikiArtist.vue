<template>
    <article v-if="!!artists">
        <h3 class="my-2 text-xl font-bold">
            <span class="text-pink-500">Artist:</span>

            <span
                class="mx-1 px-1 border border-blue-500 rounded text-blue-300"
            >
                {{ artists.name }}</span
            >
        </h3>
        <h4 class="my-2 text-lg font-bold text-pink-500">Other names</h4>
        <span
            class="mx-1 my-2 px-1 border border-pink-500 rounded text-pink-300"
            v-for="name in artists.other_names"
            :key="name"
        >
            {{ name }}
        </span>
        <h4 class="my-2 text-lg font-bold text-pink-500">URL</h4>
        <ul>
            <li v-for="url in artists.urls" :key="url">
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
</template>

<script>
export default {
    name: "WikiArtist",
    props: ["artists"],
};
</script>
