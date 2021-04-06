<template>
    <form
        class="flex flex-col sm:flex-row mx-auto mb-1"
        id="app-form"
        action="/"
        method="get"
        @submit="checkForm"
    >
        <div v-if="formData.errors.length">
            <p v-for="(error, index) in formData.errors" :key="index">
                <b>{{ error }}</b>
            </p>
        </div>
        <div>
            <input
                class="m-1 p-2 border border-pink-500 rounded-lg placeholder-pink-600 placeholder-opacity-50 font-semibold"
                type="search"
                name="char, tags"
                placeholder="Characters, Tags, etc..."
                autocomplete="off"
                tabindex="1"
                @focus="formData.tags.isTrue = true"
                @keyup="searchFormValues($event.target.value)"
            />
            <div class="relative mx-1 -mt-1">
                <ul
                    class="absolute flex flex-col w-full bg-white border border-pink-500 rounded-lg"
                    v-show="apiData.length > 0"
                >
                    <li v-for="(element, index) in apiData" :key="index">
                        <a
                            class="block px-2 hover:bg-pink-500 focus:bg-pink-500 hover:text-white focus:text-white cursor-pointer"
                            tabindex="2"
                            @click="logFun($event.target.text)"
                            @keydown.enter="logFun($event.target.text)"
                            >{{ element.name }}</a
                        >
                    </li>
                </ul>
            </div>
        </div>
        <div class="m-auto" id="form-buttons">
            <input
                class="mx-1 p-2 bg-white hover:bg-pink-500 active:bg-pink-800 border border-pink-500 rounded-full font-semibold text-pink-500 hover:text-white"
                type="button"
                value="Refresh"
                @click="resetFormValues"
            />
            <input
                class="mx-1 p-2 bg-pink-500 active:bg-white border border-pink-500 rounded-full font-semibold text-white"
                type="submit"
                value="Update"
            />
        </div>
    </form>
    <div class="flex flex-row">
        <span
            class="mr-1 px-3 py-1 bg-pink-100 hover:bg-pink-300 border border-pink-500 rounded-full cursor-pointer"
            v-for="(element, index) in formData.tags.arrayData"
            @click="formData.tags.arrayData.splice(index, 1)"
            :key="index"
            >{{ element }}</span
        >
    </div>
</template>
<script>
export default {
    data() {
        return {
            formData: {
                errors: [],
                name: null,
                tags: {
                    isTrue: false,
                    arrayData: [],
                },
                inputs: false,
            },
            apiData: [],
        };
    },
    methods: {
        checkForm(e) {
            if (this.formData.tags) {
                return true;
            }
            this.formData.errors = [];
            if (!this.formData.tags) {
                this.formData.errors.push(
                    "No olvides escribir lo que quieres buscar."
                );
            }

            e.preventDefault();
        },
        resetFormValues() {
            this.formData.name = null;
            this.formData.tags = null;
        },
        searchFormValues(search) {
            fetch(
                `https://danbooru.donmai.us/tags.json?search[name_matches]=${search}*&search[order]=count&limit=5`
            )
                .then((response) => response.json())
                .then((data) => (this.apiData = data))
                .catch((err) => console.log(err));
        },
        addArrayData(value) {
            this.formData.tags.arrayData = value;
        },
        targetClean(target) {
            target.value = "";
            this.formData.tags.isTrue = false;
        },
        logFun(log) {
            this.formData.tags.arrayData.push(log);
            this.apiData = [];
        },
    },
};
</script>
