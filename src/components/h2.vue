<template>
    <h2
        v-show="isTrue"
        class="my-8 border-b-2 border-pink-100 text-pink-500 text-center text-3xl"
    >
        {{ title }}
    </h2>
</template>
<script>
export default {
    props: ["title", "isTrue"],
};
</script>
