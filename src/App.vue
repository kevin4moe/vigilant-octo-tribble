<template>
    <div class="bg-white">
        <nav
            class="sticky top-0 flex flex-row-reverse justify-between px-8 w-full bg-white border-b-2 border-pink-100 text-pink-500"
        >
            <div id="nav-buttons">
                <a
                    href="https://github.com/kevin4moe/vigilant-octo-tribble"
                    target="_blank"
                    rel="noopener noreferrer"
                    >Github</a
                >
            </div>
            <h1 class="my-auto text-4xl">LolIOs</h1>
        </nav>
        <div class="container flex flex-col mx-auto">
            <router-view />
        </div>
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style></style>
