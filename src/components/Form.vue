<template>
    <div class="mx-auto">
        <p class="text-pink-900" v-for="(error, index) in errors" :key="index">
            <b>{{ error }}</b>
        </p>
    </div>
    <div
        class="flex flex-col sm:flex-row mx-auto mb-1 w-full sm:w-3/4"
        id="app-form"
    >
        <div title="Form input text">
            <input
                class="w-auto mx-1 mt-1 p-2 border border-pink-500 rounded-lg placeholder-pink-600 placeholder-opacity-50 font-semibold"
                type="search"
                name="char, tags"
                placeholder="Characters, Tags, etc..."
                autocomplete="off"
                tabindex="1"
                ref="mainInputElement"
                @keyup="searchTagsMatches($event.target.value)"
            />
            <div class="relative mx-1">
                <ul
                    class="absolute flex flex-col w-full bg-white border border-pink-500 rounded-lg"
                    v-show="searchTags.length > 0"
                >
                    <li v-for="(element, index) in searchTags" :key="index">
                        <a
                            class="block px-2 hover:bg-pink-500 focus:bg-pink-500 hover:text-white focus:text-white cursor-pointer"
                            tabindex="2"
                            @click="targetClean(element)"
                            @keydown.enter="targetClean(element)"
                            >{{ element.name }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-col sm:flex-row" title="form buttons">
            <input
                class="mx-1 mt-1 p-2 w-auto bg-white hover:bg-pink-500 active:bg-pink-800 border border-pink-500 rounded-full font-semibold text-pink-500 hover:text-white"
                type="button"
                value="Refresh"
                @click="targetClean(false)"
            />
            <input
                class="mx-1 mt-1 p-2 w-auto bg-pink-500 active:bg-white border border-pink-500 rounded-full font-semibold text-white"
                type="submit"
                value="Update"
                @click="checkForm('search')"
            />
        </div>
    </div>
    <form-tags-list :tagsArray="formatTags" @deleteTagArray="changeTagsArray" />
</template>
<script>
import FormTagsList from "@/components/FormTagsList.vue";
export default {
    components: { FormTagsList },
    name: "FormComponent",
    emits: ["search", "rating", "page"],
    data() {
        return {
            errors: [],
            tagList: [],
            searchTags: [],
            formatTags: {
                tagsArray: [],
                postCount: [],
            },
        };
    },
    methods: {
        checkForm(emitValue) {
            switch (emitValue) {
                case "search":
                    this.$emit("search", this.formatTags);
                    break;
            }
        },
        searchTagsMatches(search) {
            fetch(
                `https://danbooru.donmai.us/tags.json?search[name_matches]=${search}*&search[order]=count&limit=5`
            )
                .then((response) => response.json())
                .then((data) => (this.searchTags = data))
                .catch((err) => console.log(err));
        },
        targetClean(tagObj) {
            this.$refs.mainInputElement.value = "";
            this.searchTags = [];
            this.errors = [];
            tagObj = {
                name: tagObj.name,
                post_count: tagObj.post_count,
            };
            if (tagObj) {
                if (this.formatTags.tagsArray.length > 1) {
                    this.errors.push("Only 2 tags allowed.");
                    return false;
                }
                this.formatTags.tagsArray.push(tagObj.name);
                this.formatTags.postCount.push(tagObj.post_count);
            } else {
                this.tagList = [];
            }
        },
        changeTagsArray(index) {
            this.formatTags.tagsArray.splice(index, 1);
            this.formatTags.postCount.splice(index, 1);
        },
    },
};
</script>
