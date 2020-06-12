<template>
    <div class="wrap" v-if="show" :class="showContent ? 'fade-in' : 'fade-out'">
        <svg v-if="icon == 2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="times-circle" class="svg-inline w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#ff5f5f" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"></path></svg>
        <svg v-if="icon == 1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#42b983" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
        <span class="margin-left-8">{{ text+' !' }}</span>
    </div>
</template>

<script>
    export default {
        name: "AlertComponent",
    }
</script>

<style scoped>
    .wrap {
        position: fixed;
        height: 3.6rem;
        line-height: 3.6rem;
        top: 10%;
        left: 50%;
        z-index: 31;
        transform: translateX(-50%);
        background-color: rgba(255, 255, 255, 0.8);
        padding: 0 1.2rem;
        font-size: 16px;
        font-weight: bold;
        text-align: center;
        color: #6C6C72;
        border-radius: 8px;
        box-shadow: 2px 6px 10px #DBDBDB,
                    -2px -1px 10px #DBDBDB;
    }
    .fade-in {
        animation: animation_in 0.36s;
    }
    .fade-out {
        animation: animation_out 0.36s;
    }
    @keyframes animation_in {
        0% {
            opacity: 0;
            top: 8%;
        }
        100% {
            opacity: 1;
            top: 10%;
        }
    }
    @keyframes animation_out {
        0% {
            opacity: 1;
            top: 10%;
        }
        100% {
            opacity: 0;
            top: 8%;
        }
    }
</style>