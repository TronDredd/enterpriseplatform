<template>
    <div id="register" class="form-content">
        <h1 class="title">
            <span @click="toLoginHandler">LOGIN</span>
            /
            <span class="span-active">REGISTER</span>
        </h1>
        <div class="nickname-input">
            <input v-model="user_name" type="text" class="nickname-input_input" placeholder="请输入用户名">
        </div>
        <div class="password-input">
            <input v-model="password" type="password" class="password-input_input" placeholder="请输入密码">
        </div>
        <div class="password-repeat-input">
            <input v-model="password_repeat" type="password" class="password-repeat-input_input" placeholder="请再次输入密码">
        </div>
        <div class="telephone-input">
            <input v-model="telephone" type="text" class="telephone-input_input" placeholder="请输入手机号">
        </div>
        <button class="style-button" @click="registerHandler">
            <span class="style-button_real-text-holder">
                <span class="style-button_real-text">账号注册</span>
                <span class="style-button_moving-block face">
                    <span class="style-button_text-holder">
                        <span class="style-button_text">账号注册</span>
                    </span>
                </span>
            </span>
            <span class="style-button_moving-block back">
                <span class="style-button_text-holder">
                    <span class="style-button_text">账号注册</span>
                </span>
            </span>
        </button>
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
    .nickname-input, .password-input, .password-repeat-input, .telephone-input {
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