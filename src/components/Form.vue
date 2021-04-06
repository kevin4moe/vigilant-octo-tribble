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
                class="m-1 p-2 border rounded-full border-pink-500 placeholder-pink-600 placeholder-opacity-50 font-semibold"
                id="name"
                type="search"
                name="name"
                placeholder="Character Name"
                autocomplete="off"
                v-model="formData.name"
                @keyup="searchFormValues($event.target.value)"
            />
            <ul hidden>
                <li>a</li>
                <li>b</li>
                <li>c</li>
            </ul>
        </div>
        <div>
            <input
                class="m-1 p-2 border border-pink-500 rounded-lg placeholder-pink-600 placeholder-opacity-50 font-semibold focus:rounded-b-sm"
                id="tags"
                type="search"
                name="tags"
                placeholder="Tags"
                autocomplete="off"
                @focus="formData.tags.isTrue = true"
                @blur="blurFocus($event.target)"
                @keyup="searchBeta"
            />
            <div class="relative mx-1 -mt-1">
                <ul
                    class="absolute flex flex-col w-full bg-white border border-pink-500 rounded-b-lg"
                    v-show="formData.tags.isTrue | (apiData.length > 0)"
                >
                    <li
                        class="hover:bg-pink-500 hover:text-white"
                        v-for="(element, index) in apiData"
                        :key="index"
                    >
                        <a
                            class="block px-2 cursor-pointer"
                            @click="logFun($event.target.text)"
                            >{{ element.val }}</a
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
                `https://danbooru.donmai.us/tags.json?search[name_matches]=${search}*`
            )
                .then((response) => response.json())
                .then((data) => (this.apiData = data));
        },
        searchBeta() {
            this.apiData = [
                { val: "Iosono_3000" },
                { val: "Iosono_2000" },
                { val: "Iosono_1000" },
            ];
        },
        addArrayData(value) {
            this.formData.tags.arrayData = value;
        },
        blurFocus(target) {
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
