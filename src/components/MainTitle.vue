<template>
    <h2
        class="my-8 border-b-2 border-pink-100 text-pink-500 text-center text-3xl font-sans"
    >
        About {{ Intl.NumberFormat().format(many) }} results [{{ rating }}][{{
            page
        }}]
    </h2>
</template>
<script>
export default {
    props: ["many", "rating", "page"],
};
</script>
