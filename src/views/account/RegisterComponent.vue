<template>
    <div class="register-component">
        <h1>用户注册</h1>
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
        <div class="d-flex flex-column input-box">
            <span>重复密码</span>
            <div class="gap"></div>
            <input type="password" v-model="password_repeat">
        </div>
        <div class="d-flex flex-column input-box">
            <span>手机号码</span>
            <div class="gap"></div>
            <input type="text" v-model="telephone">
        </div>
        <button class="button" @click="registerHandler">注册</button>
    </div>
</template>

<script>
    import {urlRegister} from "../../utils/urls";

    const msgs = [
        '输入项不能为空',
        '两次密码输入不一致',
        '用户名已存在',
        '参数缺失',
        '其他异常'
    ]
    export default {
        name: "RegisterComponent",
        data() {
            return {
                user_name: '',
                password: '',
                password_repeat: '',
                telephone: ''
            }
        },
        methods: {
            registerHandler() {
                const user_name = this.user_name,
                      password = this.password,
                      password_repeat = this.password_repeat,
                      telephone = this.telephone;
                if(!user_name || !password || !password_repeat || !telephone) {
                    this.showWarning(msgs[0]);
                    return;
                }
                if(password != password_repeat) {
                    this.showWarning(msgs[1]);
                    return;
                }
                const params = new URLSearchParams();
                params.append('user_name', user_name);
                params.append('password', password);
                params.append('telephone', telephone);
                params.append('industry', '0');

                this.$axios
                    .post(urlRegister, params)
                    .then(response => {
                        console.log(JSON.stringify(response.data));
                        const data = response.data.data;
                        if(data && data == 'register success') {
                            //user_name保存在sessionStorage中
                            sessionStorage.setItem('user_name', user_name);
                            const user_info = {
                                'user_name': user_name,
                                'telephone': telephone,
                            };
                            this.$store.commit('updateUserInfo', user_info);
                            //注册成功 直接跳到主页
                            this.$router.push({name: 'Main'});
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        const error_code = error.response.data.error_code;
                        if(error_code) {
                            switch (error_code) {
                                case 400101:
                                    this.showWarning(msgs[3]);
                                    break;
                                case 400102:
                                    this.showWarning(msgs[2]);
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
            toLoginHandler() {
                this.$emit('routerChange', ['login']);
                this.$router.push({path: '/account'});
            }
        }
    }
</script>

<style scoped>
    .register-component {
        padding: 0 6.7rem 4.5rem;
        background-color: #ffffff;
        box-shadow: -2.7rem 2.7rem 0 #221D7A;
        border-radius: 1.6rem;
        opacity: 1;
        transition: all 0.6s ease 0.4s;
        backface-visibility: hidden;
        transform: perspective(600px) rotateY(180deg);
        transition: transform .6s linear;
    }
    .register-component h1 {
        padding: 6.9rem 0 3.2rem;
        font-size: 3.2rem;
        font-weight: bold;
        color: #5A8FFF;
        text-align: center;
        letter-spacing: 0.8rem;
    }
    .input-box {
        margin-top: 2.8rem;
        padding-bottom: .4rem;
        border-bottom: 1px solid #D8D8D8;
    }
    .input-box .gap {
        height: .4rem;
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
        letter-spacing: .4rem;
    }
    .input-box input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
        -webkit-text-fill-color: #000000;
        font-family: Montserrat-Regular;
        font-size: 2rem;
    }
    .button {
        width: 100%;
        margin: 1.2rem 0 0;
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