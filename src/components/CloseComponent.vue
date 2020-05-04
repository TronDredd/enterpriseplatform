<template>
    <div class="close-self" @click="back">
        <img src="../assets/svg/x.svg">
    </div>
</template>

<script>
    export default {
        name: "CloseComponent",
        methods: {
            back() {
                this.$router.back();
            }
        }
    }
</script>

<style scoped>
    .close-self {
        position: absolute;
        top: 1.2rem;
        right: 1.5rem;
        cursor: pointer;
        opacity: 0.5;
    }
    .close-self img {
        width: 2.4rem;
        height: 2.4rem;
    }
    .close-self:hover {
        opacity: 1;
    }
</style>