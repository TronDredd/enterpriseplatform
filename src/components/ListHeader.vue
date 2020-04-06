<template>
    <nav class="d-flex justify-content-between padding-4-6 border-bottom">
        <span>{{ listName }}</span>
    </nav>
</template>

<script>
    export default {
        name: "ListHeader",
        props: ['listName']
    }
</script>

<style scoped>
    .padding-4-6 {
        padding: .4rem .6rem;
    }
    .border-bottom {
        border-bottom: 1px solid;
    }
</style>