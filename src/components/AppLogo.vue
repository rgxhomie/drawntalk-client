<template>
    <h3><router-link to="/" class="logo_text-element text-decoration-none">Draw&Talk</router-link></h3>
</template>

<script>
    export default {
        name: 'app-logo'
    }
</script>

<style scoped>
    .logo_text-element {
        background: #7f7fd5;
        background: -webkit-linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
        background: linear-gradient(to right, #91eae4, #86a8e7, #7f7fd5);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }

    .logo_text-element:hover {
        cursor:pointer;
    }
</style>