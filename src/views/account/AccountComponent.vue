<template>
    <div id="account">
        <div class="logo-box">
            <img src="../../assets/company_logo.png">
            <span>企业购销</span>
        </div>
        <div class="right-box linear-box third-floor">
            <div class="linear-box linear-box second-floor">
                <div class="linear-box linear-box first-floor"></div>
            </div>
        </div>
        <div class="left-box linear-box third-floor">
            <div class="linear-box linear-box second-floor">
                <div class="linear-box linear-box first-floor"></div>
            </div>
        </div>
        <router-view class="middle"></router-view>
<!--        <LoginComponent class="middle"></LoginComponent>-->
<!--        <RegisterComponent class="middle"></RegisterComponent>-->
        <LoadingComponent v-if="show_loading" style="background-color: rgba(0, 0, 0, 0.2)"></LoadingComponent>
    </div>
</template>

<script>
    import LoginComponent from "./LoginComponent";
    import RegisterComponent from "./RegisterComponent";
    import LoadingComponent from "../../components/LoadingComponent";
    export default {
        name: "AccountComponent",
        components: {RegisterComponent, LoginComponent, LoadingComponent},
        data() {
            return {
                show_loading: false,
            }
        },
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
            this.show_loading = true;
            setTimeout(() => {
                this.show_loading = false;
            }, 1000);
            setTimeout(() => {
                document.body.classList.add("document-loaded")
            }, 1200);
        },
        beforeRouteEnter(to, from, next) {
            // if(getCookie('token')) {
            //     console.log(`the user has been remembered, turn to the main page`);
            //     sessionStorage.setItem('token', getCookie('token'));
            //     // next('/main');
            //     next({path: '/main/user_list', query: {page_num: 1, page_size: 200}});
            //     return;
            // }
            document.body.style.backgroundColor = '#060524';
            next();
        }
    }
</script>

<style scoped>
    #account {
        position: relative;
        width: 100%;
        /*min-width: */
        height: 100%;
        min-width: 1280px;
        min-height: 678px;
        overflow: hidden;
    }
    .logo-box {
        position: absolute;
        top: 2.3rem;
        left: 6rem;
    }
    .logo-box img {
        width: 4.4rem;
        height: 4.4rem;
    }
    .logo-box span {
        font-size: 1.9rem;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: .6rem;
        margin-left: 1.2rem;
    }
    .middle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -40%);
        opacity: 0;
        transition: all .6s linear .4s;
    }
    .document-loaded .middle {
        transform: translate(-50%, -50%);
        opacity: 1;
    }
    .right-box {
        position: absolute;
        top: 14.5rem;
        right: 16.8rem;
        opacity: 0.5;
    }
    .first-floor {
        width: 49.7rem;
        height: 34.1rem;
    }
    .second-floor {
        padding: 5.9rem 3.7rem;
    }
    .third-floor {
        padding: 5.9rem 3.7rem;
        transform: rotate(25deg);
    }
    .linear-box {
        border: 8px solid;
        border-image: linear-gradient(200deg, rgba(56,49,193,1), rgba(26,22,141,0) 16%) 8 8;
    }
    /* 顺序问题 */
    .left-box {
        position: absolute;
        bottom: 14.5rem;
        left: 16.5rem;
        opacity: 0.5;
        transform: rotate(205deg);
    }
</style>