<template>
    <div class="flex flex-row justify-center" v-show="!isHidden">
        <input
            class="mx-1 mt-1 p-2 w-full border border-pink-500 rounded-lg text-center text-pink-200 font-semibold"
            type="text"
            list="rating"
            name="selectRating"
            placeholder="Rating: safe, questionable y explicit"
            @focus="$event.target.value = ''"
            @change="testLog($event)"
        />
        <datalist id="rating" ref="listData">
            <option value="s" label="Safe"></option>
            <option value="q" label="Questionable"></option>
            <option value="e" label="Explicit"></option>
        </datalist>

        <!-- <input
            class="mx-1 mt-1 p-2 w-12 border border-pink-500 rounded-lg text-center text-pink-200 font-semibold"
            type="number"
            min="1"
            max="10"
            value="1"
            name="selectNumber"
            placeholder="Select rating"
            @keydown.enter="checkForm('page', $event.target.value)"
        /> -->
    </div>

    <button
        class="mx-1 mt-1 p-2 border border-pink-500 rounded-lg text-pink-200 font-semibold"
        v-show="isHidden"
        @click="showByBoolean"
    >
        Advance
    </button>
</template>
<script>
export default {
    data: function () {
        return {
            isHidden: true,
        };
    },
    methods: {
        showByBoolean() {
            this.isHidden = false;
        },
        showListData() {
            this.$refs.listData.style.display = "block";
        },
        testLog(val) {
            console.log(val.target.value);
        },
    },
};
</script>
