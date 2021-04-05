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
        <input
            class="m-1 p-2 border rounded-full border-pink-500 placeholder-pink-600 placeholder-opacity-50 font-semibold"
            id="name"
            type="search"
            name="name"
            placeholder="Character Name"
            v-model="formData.name"
            @keyup="searchFormValues($event.target.value)"
        />
        <input
            class="m-1 p-2 border rounded-full border-pink-500 placeholder-pink-600 placeholder-opacity-50 font-semibold"
            id="tags"
            type="search"
            name="tags"
            placeholder="Tags"
            v-model="formData.tags"
            @keyup="searchFormValues($event.target.value)"
        />
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
</template>
<script>
export default {
    data() {
        return {
            formData: {
                errors: [],
                name: null,
                tags: null,
                inputs: false,
            },
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
            console.log("data");
            fetch(
                `https://danbooru.donmai.us/tags.json?search[name_matches]=${search}*`
            )
                .then((response) => response.json())
                .then((data) => console.log(data));
        },
    },
};
</script>
