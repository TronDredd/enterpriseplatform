<template>
    <div id="header-bar" class="bg-white">
        <nav class="nav justify-content-between align-items-center first-line">
            <li class="nav-item">
                <button class="btn" id="showSideBar">
                    <i class="fas fa-bars"></i>
                </button>
            </li>
            <li class="nav-item">
                <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
<!--                    <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="user-circle" class="svg-inline&#45;&#45;fa fa-user-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M248 104c-53 0-96 43-96 96s43 96 96 96 96-43 96-96-43-96-96-96zm0 144c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-240C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-49.7 0-95.1-18.3-130.1-48.4 14.9-23 40.4-38.6 69.6-39.5 20.8 6.4 40.6 9.6 60.5 9.6s39.7-3.1 60.5-9.6c29.2 1 54.7 16.5 69.6 39.5-35 30.1-80.4 48.4-130.1 48.4zm162.7-84.1c-24.4-31.4-62.1-51.9-105.1-51.9-10.2 0-26 9.6-57.6 9.6-31.5 0-47.4-9.6-57.6-9.6-42.9 0-80.6 20.5-105.1 51.9C61.9 339.2 48 299.2 48 256c0-110.3 89.7-200 200-200s200 89.7 200 200c0 43.2-13.9 83.2-37.3 115.9z"></path></svg>-->
                    <span>Administrator</span>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
<!--                    <a class="dropdown-item pointer">{{ username }}</a>-->
                    <a class="dropdown-item pointer" @click="exit()">
<!--                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline&#45;&#45;fa fa-sign-out-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>-->
                        exit
                    </a>
                </div>
            </li>
        </nav>
        <router-view name="v-selectedcomponent"></router-view>
    </div>
</template>

<script>

    export default {
        name: "HeaderComponent",
        methods: {
            exit() {
                this.clear();
                this.$router.push('/account');
            }
        }
    }
</script>

<style scoped>
    nav {
        height: 8vh;
        padding: 0 1rem;
        font-weight: 600;
    }
    nav span {
        margin-left: .8rem;
    }
    .first-line {
        border-bottom: 1px solid #f3f3f3;
    }
    .second-line a {
        margin: 0 1.2rem;
    }
    #header-bar {
        position: relative;
        z-index: 25;
    }
    #doc {
        margin-right: .8rem;
    }
</style>