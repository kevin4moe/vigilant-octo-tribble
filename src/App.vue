<template>
    <nav>
        <span>log in</span>
        <span>sign up</span>
    </nav>
    <h1>LolIOs</h1>
    <div class="container">
        <router-view />
    </div>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
