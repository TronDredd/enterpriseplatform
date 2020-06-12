<template>
    <div id="header-bar" class="bg-white">
        <nav class="nav justify-content-between align-items-center first-line">
            <li>
                <img src="../../../assets/unfold@f164810e.png" class="unfold-img pointer" @click="sideBarSlide" v-if="show_unfold">
            </li>
            <li>
                <div class="d-flex align-items-center pointer" data-toggle="dropdown"  aria-haspopup="true" aria-expanded="false">
                    <div class="avatar">
                        <img src="../../../assets/svg/user-solid.svg">
                    </div>
                    <div class="arrow"></div>
                </div>
                <div class="dropdown-menu">
                    <a class="dropdown-item pointer" @click="jumpToUserInfo">{{ company_name }}</a>
                    <a class="dropdown-item pointer" @click="exit()">
<!--                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline&#45;&#45;fa fa-sign-out-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>-->
                        exit
                    </a>
                </div>
            </li>
        </nav>
    </div>
</template>

<script>

    export default {
        name: "HeaderComponent",
        props: ['show_unfold'],
        data() {
            return {
                company_name: this.$store.state.user_info.company_name == undefined ? '' : this.$store.state.user_info.company_name
            }
        },
        methods: {
            sideBarSlide() {
                this.$emit('sideBarSlide');
            },
            jumpToUserInfo() {
                const query = {
                    item: JSON.stringify(this.$store.state.user_info)
                };
                const route = {
                    path: '/main/user_info',
                    query: query
                };
                this.$router.push(route).catch();
            },
            exit() {
                this.clear();
                this.$router.push('/account');
            }
        }
    }
</script>

<style scoped>
    #header-bar {
        padding-right: 3.6rem;
    }
    nav {
        /*width ???*/
        width: 100%;
        height: 100%;
        font-weight: 600;
    }
    nav span {
        margin-left: .8rem;
    }
    nav .unfold-img {
        width: 2.4rem;
        width: 2.4rem;
        margin-left: 3.2rem;
    }
    .second-line a {
        margin: 0 1.2rem;
    }
    .avatar {
        width: 4.4rem;
        height: 4.4rem;
        line-height: 4.4rem;
        text-align: center;
        border: 1px solid #979797;
        border-radius: 50%;
    }
    .avatar img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-image: url("../../../assets/svg/user-solid.svg");
        background-size: contain;
        background-position: center;
    }
    .arrow {
        width: 0;
        height: 0;
        margin-left: 1.5rem;
        border: 6px solid transparent;
        border-top-color: #979797;
    }
    .dropdown-menu {
        top: 0.9rem!important;
        font-size: 1.4rem;
    }
</style>