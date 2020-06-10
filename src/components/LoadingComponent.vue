<template>
    <div class="loading-bg">
        <div class="spinner">
            <div class="rect1"></div>
            <div class="rect2"></div>
            <div class="rect3"></div>
            <div class="rect4"></div>
            <div class="rect5"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped>
    .loading-bg {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: rgba(255,255,255,.9);
    }
    .spinner {
        width: 9.6rem;
        height: 3.6rem;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .spinner div {
        height: 100%;
        width: 1.2rem;
        background-color: #3831C1;
        -webkit-animation: stretchdelay 1s infinite ease-in-out;
        animation: stretchdelay 1s infinite ease-in-out;
    }
    .spinner .rect2 {
        -webkit-animation-delay: 0.1s;
        animation-delay: 0.1s;
    }
    .spinner .rect3 {
        -webkit-animation-delay: 0.2s;
        animation-delay: 0.2s;
    }
    .spinner .rect4 {
        -webkit-animation-delay: 0.3s;
        animation-delay: 0.3s;
    }
    .spinner .rect5 {
        -webkit-animation-delay: 0.4s;
        animation-delay: 0.4s;
    }
    @keyframes stretchdelay {
        0%, 100% {
            transform: scaleY(1.0);
            -webkit-transform: scaleY(1.0);
        }
        40% {
            transform: scaleY(2.4);
            -webkit-transform: scaleY(2.4);
        }
    }
    @-webkit-keyframes stretchdelay {
        0%, 100% {
            -webkit-transform: scaleY(1.0);
        }
        40% {
            -webkit-transform: scaleY(2.4);
        }
    }
</style>