<template>
    <nav class="list-header">
        <span :class="block_color"></span>
        <span class="header-text">{{ listName }}</span>
    </nav>
</template>

<script>
    export default {
        name: "ListHeader",
        props: ['listName', 'block_color']
    }
</script>

<style scoped>
    .list-header {
        padding: 2.37rem 0 1.18rem;
        font-size: 2rem;
        font-weight: bold;
        color: #232323;
    }
    .block-blue {
        position: relative;
        top: 0.2rem;
        display: inline-block;
        width: 0.6rem;
        height: 2rem;
        background-color: #0C5AFF;
    }
    .block-yellow {
        position: relative;
        top: 0.2rem;
        display: inline-block;
        width: 0.6rem;
        height: 2rem;
        background-color: #FFA70C;
    }
    .block-purple {
        position: relative;
        top: 0.2rem;
        display: inline-block;
        width: 0.6rem;
        height: 2rem;
        background-color: #730CFF;
    }
    .header-text {
        margin-left: 1.58rem;
    }
</style>