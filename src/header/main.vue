<template>
    <nav
        class="sticky top-0 flex flex-row-reverse justify-between px-8 w-full bg-white border-b-2 border-pink-100 text-pink-500"
    >
        <!-- <div id="nav-buttons">
            <a
                href="https://github.com/kevin4moe/vigilant-octo-tribble"
                target="_blank"
                rel="noopener noreferrer"
                >Github</a
            >
        </div> -->
        <select
            class="bg-white"
            name="rating"
            id="rating-select"
            @change="$emit('update:rating', $event.target.value)"
        >
            <option value="s">Safe</option>
            <option value="q">Questionable</option>
            <option value="e">Explicit</option>
        </select>
        <h1 class="my-auto text-4xl">LolIOs</h1>
    </nav>
</template>

<script>
export default {
    props: ["rating"],
    emits: ["update:rating"],
};
</script>
