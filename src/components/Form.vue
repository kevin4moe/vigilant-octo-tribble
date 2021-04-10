<template>
    <div class="flex flex-col sm:flex-row mx-auto mb-1" id="app-form">
        <div>
            <p v-for="(error, index) in errors" :key="index">
                <b>{{ error }}</b>
            </p>
        </div>
        <div>
            <input
                class="mx-1 mt-1 p-2 border border-pink-500 rounded-lg placeholder-pink-600 placeholder-opacity-50 font-semibold"
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
                            @click="targetClean($event.target.text)"
                            @keydown.enter="targetClean($event.target.text)"
                            >{{ element.name }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div class="flex flex-col sm:flex-row" id="form-buttons">
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
                @click="checkForm()"
            />
        </div>
    </div>
    <div class="flex flex-row">
        <span
            class="mr-1 px-3 py-1 bg-pink-100 hover:bg-pink-300 border border-pink-500 rounded-full cursor-pointer"
            v-for="(element, index) in tagList"
            @click="tagList.splice(index, 1)"
            :key="index"
            >{{ element }}</span
        >
    </div>
</template>
<script>
export default {
    name: "FormComponent",
    emits: ["search"],
    data() {
        return {
            errors: [],
            tagList: [],
            searchTags: [],
        };
    },
    methods: {
        checkForm() {
            this.$emit("search", this.tagList);
        },
        searchTagsMatches(search) {
            fetch(
                `https://danbooru.donmai.us/tags.json?search[name_matches]=${search}*&search[order]=count&limit=5`
            )
                .then((response) => response.json())
                .then((data) => (this.searchTags = data))
                .catch((err) => console.log(err));
        },
        targetClean(target) {
            this.$refs.mainInputElement.value = "";
            this.searchTags = [];
            this.errors = [];
            target ? this.errorControl("double", target) : (this.tagList = []);
        },
        errorControl(action, value) {
            if (this.tagList.length > 1) {
                this.errors.push("Solo se permiten 2 tags.");
                return false;
            }
            if (action === "double") {
                var isDouble = this.tagList.find((item) => value === item);
                !isDouble
                    ? this.tagList.push(value)
                    : this.errors.push("Tag is already exists.");
            }
        },
    },
};
</script>
