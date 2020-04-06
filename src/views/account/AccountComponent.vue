<template>
    <div class="login-wrap" id="account">
        <div class="login-form" id="form">
            <div class="form-cover"></div>
            <div class="form-loader">
                <div class="spinner">
                    <svg class="spinner-circular" viewBox="25 25 50 50">
                        <circle
                                class="spinner-path"
                                cx="50"
                                cy="50"
                                r="20"
                                fill="none"
                                stroke-width="4"
                                stroke-miterlimit="10"
                        ></circle>
                    </svg>
                </div>
            </div>
            <router-view v-on:routerChange="routerChangeHandler(arguments)"></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AccountComponent",
        methods: {
            routerChangeHandler(args) {
                const component_name = args[0];
                console.log(component_name);
                const form = document.getElementById('form');
                if(component_name == 'register') {
                    //跳转至注册组件
                    form.style.height = '540px';
                } else {
                    //跳转至登录组件
                    form.style.height = '400px';
                }
            }
        },
        mounted() {
            setTimeout(() => {
                document.body.classList.add("on-start")
            }, 100);
            setTimeout(() => {
                document.body.classList.add("document-loaded")
            }, 1800)
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: fixed;
        width: 100%;
        height: 100%;
        background: #3f2766;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-form {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: center;
        width: 400px;
        height: 400px;
        flex-shrink: 0;
        padding: 20px;
        border-radius: 5px;
    }
    .spinner {
        position: relative;
        margin: auto;
        width: 50px;
        height: 50px;
        transition: all 0.2s ease 0s;
    }
    .spinner-circular {
        /*改变元素基点*/
        transform-origin: center center;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        margin: auto;
    }
    .spinner-path {
        stroke-dasharray: 1,200;
        stroke-dashoffset: 0;
        /*1，动画的名称 2，动画持续的时间 3，动画的过渡类型 贝塞尔曲线 4，设置动画的延迟时间(放在最后) 5，设置动画的循环次数 6，设置动画是否反向运动 7，设置动画时间之外的状态 forwards*/
        animation: dash 1.3s ease forwards 0.5s;
        opacity: 0;
        stroke-linecap: round;
        stroke: blueviolet;
        animation-play-state: running;
    }
    @keyframes dash {
        0% {
            stroke-dasharray: 1,200;
            opacity: 0;
        }
        50% {
            stroke-dasharray: 40,200;
            opacity: 1;
        }
        100% {
            /*3.14 * 20 * 2*/
            stroke-dasharray: 125,200;
            opacity: 1;
        }
    }
    .form-loader {
        display: flex;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        z-index: -4;
        transition: all 0.5s ease;
    }
    .form-cover {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        z-index: -4;
        border-radius: 7px;
        overflow: hidden;
        transition: all 0.3s ease 0.8s;
        box-shadow: 0 0 0 0 rgba(0,0,0,0);
    }
    .form-cover:after {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: #4d317a;
        z-index: -4;
        border-radius: 50%;
        transition: all 1.5s ease 0.3s;
        transform: scale(0);
    }
    .form-cover:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background: #ffffff;
        z-index: -5;
        border-radius: 50%;
        transition: all 0.5s ease;
        transform: scale(0);
    }
    body.on-start .form-cover:before {
        transform: scale(0.15);
    }
    body.document-loaded .form-loader {
        transform: scale(0);
        opacity: 0;
        visibility: hidden;
    }
    body.document-loaded .form-cover {
        box-shadow: 0 20px 50px rgba(255, 255, 255 ,0.2);
    }
    body.document-loaded .form-cover:after {
        transform: scale(2);
    }
    body.document-loaded .form-cover:before {
        -webkit-transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
        transition: opacity 0.3s ease 0.8s, -webkit-transform 2s ease;
        transition: transform 2s ease, opacity 0.3s ease 0.8s;
        transition: transform 2s ease, opacity 0.3s ease 0.8s,
        -webkit-transform 2s ease;
        transform: scale(2);
        opacity: 1;
    }
    body.document-loaded .form-content {
        opacity: 1;
        transform: none;
    }
</style>