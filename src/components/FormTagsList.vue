<template>
    <div class="flex flex-row justify-center">
        <button
            class="mr-1 px-3 py-1 bg-pink-100 hover:bg-pink-300 border border-pink-500 rounded-full"
            v-for="(element, index) in tagsArray.tagsArray"
            @click="$emit('deleteTagArray', index)"
            :key="index"
        >
            {{ element }}
            <span class="text-sm text-gray-500">{{
                new Intl.NumberFormat("en-GB", {
                    notation: "compact",
                    compactDisplay: "short",
                }).format(tagsArray.postCount[index])
            }}</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "FormTagsList",
    props: ["tagsArray"],
    emits: ["deleteTagArray"],
};
</script>
