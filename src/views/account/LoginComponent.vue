<template>
    <div class="form-content">
        <h1 class="title">
            <span class="span-active">LOGIN</span>
            /
            <span @click="toRegisterHandler">REGISTER</span>
        </h1>
        <div class="nickname-input">
            <input v-model="user_name" type="text" class="nickname-input_input" placeholder="请输入用户名"/>
        </div>
        <div class="password-input">
            <input v-model="password" type="password" class="password-input_input" placeholder="请输入密码"/>
        </div>
        <button class="style-button" @click="loginHandler">
            <span class="style-button_real-text-holder">
                <span class="style-button_real-text">账号登录</span>
                <span class="style-button_moving-block face">
                    <span class="style-button_text-holder">
                        <span class="style-button_text">账号登录</span>
                    </span>
                </span>
            </span>
            <span class="style-button_moving-block back">
                <span class="style-button_text-holder">
                    <span class="style-button_text">账号登录</span>
                </span>
            </span>
        </button>
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
                const params = new URLSearchParams();
                params.append('user_name', user_name);
                params.append('password', password);
                this.$axios
                    .post(urlLogin, params)
                    .then(response => {
                        console.log(JSON.stringify(response.data));
                        const data = response.data.data;
                        if(data) {
                            console.log(JSON.stringify(data));
                            //用户名保存在sessionStorage和vuex中
                            sessionStorage.setItem('user_name', user_name);
                            this.$store.commit('updateUserInfo', data);
                            if(data.token) {
                                sessionStorage.setItem('token', data.token);
                                if(this.is_remember) {
                                    localStorage.setItem('token', data.token);
                                }
                            }
                            //登录成功 跳转至主界面
                            this.$router.push({name: 'Main'});
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
    .form-content {
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 0;
        position: relative;
        /*配合opacity 0*/
        transform: translateY(10px);
        /*all指的是所有的变化*/
        transition: all 0.3s ease 0.7s;
        flex-direction: column;
    }
    .title {
        font-size: 16px;
        color: #714cab;
        letter-spacing: 3px;
        text-shadow: 0 0 5px;
    }
    .title span {
        cursor: pointer;
    }
    .span-active {
        font-size: 36px;
        color: rgba(255, 255, 255, 0.4);
    }
    .form-content input {
        width: 100%;
        -webkit-appearance: none;
        border: none;
        font-size: 14px;
        background: none;
        letter-spacing: 3.5px;
        font-weight: 600;
        padding: 12px 16px;
    }
    .form-content input:focus {
        outline: none;
    }
    .form-content input::-webkit-input-placeholder {
        color: #ffffff;
        text-shadow: 0 0 5px;
    }
    .nickname-input, .password-input {
        width: 100%;
        position: relative;
        margin-bottom: 25px;
        border-radius: 5px;
        transition: all 0.3s ease;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }
    .style-button {
        cursor: pointer;
        -webkit-appearance: none;
        -webkit-user-select: none;
        font-size: 14px;
        width: 100%;
        outline: none;
        background: none;
        border: none;
        text-transform: uppercase;
        padding: 12px 20px;
        position: relative;
        letter-spacing: 10px;
        transition: all 0.3s ease;
        overflow: hidden;
        background: #714cab;
        border-radius: 3px;
        color: #492e72;
        font-weight: 600;
        margin-bottom: 25px;
    }
    .style-button:hover,.style-button:active {
        box-shadow: 0 8px 20px rgba(0,0,0,0.3);
        background: #714cab;
    }
    .style-button_real-text-holder {
        position: relative;
    }
    .style-button_real-text {
        color: transparent;
        display: inline-block;
    }
    .style-button_text-holder {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 1s ease;
    }
    .style-button_moving-block {
        transition: all 1s ease;
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
    .style-button_moving-block.back {
        color: #ffffff;
        transform: translateX(-100%);
    }
    .style-button_moving-block.back .style-button_text-holder {
        transform: translateX(100%);
    }
    .style-button:hover .face,
    .style-button:active .face {
        transform: translateX(100%);
    }
    .style-button:hover .face .style-button_text-holder,
    .style-button:active .face .style-button_text-holder {
        transform: translateX(-100%);
    }
    .style-button:hover .back,
    .style-button:active .back {
        transform: translateX(0);
    }
    .style-button:active .back .style-button_text-holder,
    .style-button:hover .back .style-button_text-holder{
        transform: translateX(0);
    }
    .style-button_text-holder:active {
        box-shadow: 0 0 5px rgba(0,0,0,0.3);
    }
</style>