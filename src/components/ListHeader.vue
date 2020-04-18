<template>
    <nav class="bg-white d-flex justify-content-between padding-4-10 border-bottom">
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
    .padding-4-10 {
        padding: .4rem 1rem;
    }
    .border-bottom {
        border-bottom: 1px solid;
    }
</style>