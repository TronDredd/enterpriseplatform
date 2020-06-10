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
        width: 2.4rem;
        height: 2.4rem;
        line-height: 2.4rem;
        top: 1.2rem;
        right: 1.5rem;
        cursor: pointer;
    }
    /*.close-self img {*/
    /*    width: 100%;*/
    /*    height: 100%;*/

    /*}*/
    .close-self img {
        opacity: 0.5;
        transition: transform 0.2s ease-in-out;
    }
    .close-self:hover > img {
        opacity: 1;
        transform: rotate(180deg);
        transform-origin: 50% 50%;
    }
</style>