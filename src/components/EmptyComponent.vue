<template>
    <div></div>
</template>

<script>
    export default {
        name: "EmptyComponent",
        props: ['path', 'query'],
        mounted() {
            this.$router.push({path: this.path, query: this.query});
        }
    }
</script>

<style scoped>

</style>