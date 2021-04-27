<template>
    <article>
        <nav>
            <button
                class="mx-1 px-4 py-2 border border-pink-500 rounded bg-pink-100"
                v-for="(tab, index) in tabs"
                @click="changePage(index)"
                :key="tab"
            >
                {{ index }} - {{ tab }}
            </button>
        </nav>
        <main v-if="!!wiki[0].title">
            <h3 class="my-2 text-xl font-bold text-pink-500">
                {{ wiki[page].title }}
            </h3>
            <p
                v-for="(paragraph, index) in wiki[page].body
                    .replaceAll(/(\[{2}|\]{2}|\*)/gi, '')
                    .split('\r\n\r\n')"
                :class="{
                    'font-bold text-lg text-pink-400': paragraph.startsWith(
                        'h'
                    ),
                }"
                :key="index"
            >
                {{ paragraph }}
            </p>
            <span class="font-bold text-pink-700"> Other names: </span>
            <button
                class="p-2 hover:bg-pink-100 rounded underline"
                v-for="name in wiki[page].other_names"
                :key="name"
            >
                {{ name }}
            </button>
        </main>
    </article>
</template>

<script>
export default {
    name: "WikiCopy",
    props: ["post"],
    data: function () {
        return {
            wiki: [],
            page: 0,
            tabs: this.copy,
        };
    },
    methods: {
        changePage(index) {
            this.page = index;
            console.log(this.wiki[this.page]);
        },
    },
    created() {
        this.tabs = this.$props.post.tag_string_copyright.split(" ");
        this.tabs.forEach((name) => {
            fetch(`https://danbooru.donmai.us/wiki_pages/${name}.json`)
                .then((response) => response.json())
                .then((data) => (this.wiki[this.page] = data))
                .catch((err) => console.log(err));
            this.page++;
        });
        console.log(this.page);
        this.page = 0;
    },
};
</script>
