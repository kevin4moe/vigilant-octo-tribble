<template>
    <div class="flex flex-row justify-around mx-auto w-1/2" v-show="isShow">
        <button
            class="px-3 py-1 border border-pink-100 rounded-lg"
            :class="
                page == actualPage ? 'bg-pink-500 text-white' : 'text-pink-500'
            "
            v-for="(page, index) in pages"
            @click="$emit('changePage', page)"
            :key="index"
        >
            {{ page }}
        </button>
    </div>
</template>

<script>
export default {
    props: ["isShow", "pages", "actualPage"],
    emits: ["changePage"],
};
</script>
