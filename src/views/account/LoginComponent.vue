<template>
    <div class="login-component">
        <h1>用户登录</h1>
        <div class="d-flex flex-column input-box">
            <span>用户名</span>
            <div class="gap"></div>
            <input type="text" v-model="user_name">
        </div>
        <div class="d-flex flex-column input-box">
            <span>密码</span>
            <div class="gap"></div>
            <input type="password" v-model="password">
        </div>
        <div class="checkbox-box d-flex flex-row justify-content-between">
            <span class="pointer" @click="toRegisterHandler">注册</span>
            <label class="margin-left-8" for="input-checkbox">
                <input type="checkbox" id="input-checkbox" v-model="is_remember">
                <span>记住我</span>
            </label>
        </div>
        <button class="button" @click="loginHandler">登录</button>
    </div>
</template>

<script>
    import {urlLogin} from '../../utils/urls';

    const msgs = [
        '用户名不能为空',
        '密码不能为空',
        '用户名或密码错误',
        '参数缺失',
        '其他异常'
    ];
    export default {
        name: "LoginComponent",
        data() {
            return  {
                user_name: "",
                password: "",
                //是否记住用户
                is_remember: false,
            }
        },
        methods: {
            loginHandler() {
                const user_name = this.user_name;
                const password = this.password;
                console.log(`user_name: ${user_name}, password: ${password}, url: ${urlLogin}`);
                if(user_name == '') {
                    this.showWarning(msgs[0]);
                    return;
                }
                if(password == '') {
                    this.showWarning(msgs[1]);
                    return;
                }
                //POST请求体form-Data中的参数
                const params = new URLSearchParams();
                params.append('user_name', user_name);
                params.append('password', password);
                this.$axios
                    .post(urlLogin, params)
                    .then(response => {
                        console.log(JSON.stringify(response.data));
                        const data = response.data.data;
                        if(data) {
                            //用户名保存在sessionStorage和vuex中
                            sessionStorage.setItem('user_name', user_name);
                            this.$store.commit('updateUserInfo', data);
                            if(data.token) {
                                sessionStorage.setItem('token', data.token);
                                if(this.is_remember) {
                                    localStorage.setItem('token', data.token);
                                }
                            }
                            const query = {page_num: 1, page_size: 20, filter: data.industry, province: 0};
                            //登录成功 跳转至主界面
                            this.$router.push({
                                path: '/main/demand_list',
                                query: query
                            });
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        const error_code = error.response.data.error_code;
                        if(error_code) {
                            switch (error_code) {
                                case 403101:
                                    this.showWarning(msgs[2]);
                                    break;
                                case 400101:
                                    this.showWarning(msgs[3]);
                                    break;
                                default:
                                    this.showWarning(msgs[4]);
                            }
                        }
                    })
            },
            showWarning(msg) {
                window.alert(msg);
            },
            toRegisterHandler() {
                this.$emit('routerChange', ['register']);
                this.$router.push({path: '/account/register'});
            }
        },
        mounted() {
            if(localStorage.getItem('token')) {
                sessionStorage.setItem('token', localStorage.getItem('token'));
                this.$router.push({name: 'Main'})
            }
        }
    }
</script>

<style scoped>
    .login-component {
        padding: 0 6.7rem 4.5rem;
        background-color: #ffffff;
        box-shadow: -2.7rem 2.7rem 0 #221D7A;
        border-radius: 1.6rem;
        opacity: 1;
        transition: all 0.4s ease 0.2s;
        backface-visibility: hidden;
        transform: perspective(600px) rotateY(0deg);
    }
    /*.login-component:hover {*/
    /*    transform: perspective(600px) rotateY(180deg);*/
    /*}*/
    .login-component h1 {
        padding: 7.8rem 0 4rem;
        font-size: 3.2rem;
        font-weight: bold;
        color: #5A8FFF;
        text-align: center;
        letter-spacing: 0.8rem;
    }
    .input-box {
        margin-top: 3rem;
        padding-bottom: .4rem;
        border-bottom: 1px solid #D8D8D8;
    }
    .input-box .gap {
        height: .6rem;
    }
    .input-box span {
        line-height: 2rem;
        font-size: 1.7rem;
        font-weight: 400;
        color: #6C6C72;
    }
    .input-box input {
        width: 38rem;
        line-height: 4.6rem;
        font-size: 2rem;
        outline: none;
        border: none;
        letter-spacing: .6rem;
    }
    .input-box input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
        -webkit-text-fill-color: #000000;
        font-family: Montserrat-Regular;
        font-size: 2rem;
    }
    .checkbox-box {
        margin: 1rem 0;
        text-align: right;
        vertical-align: middle;
        line-height: 2rem;
        font-size: 1.7rem;
        font-weight: 400;
        color: #6C6C72;
    }
    .checkbox-box > span:hover {
        color: #5A8FFF;
    }
    .button {
        width: 100%;
        margin: 0 0 2rem;
        padding: 1.3rem 0;
        outline: none;
        border: none;
        border-radius: .8rem;
        background-color: #5A8FFF;
        font-size: 1.7rem;
        letter-spacing: 1.2rem;
        color: #ffffff;
        text-align: center;
        transition: 0.6s;
    }
    .button:hover {
        background-color: #221D7A;
    }
</style>