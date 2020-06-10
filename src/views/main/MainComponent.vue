<template>
    <div id="main">
        <nav id="main-sidebar">
            <side-bar-component v-on:sideBarSlide="sideBarSlide" :show_fold="show_fold"></side-bar-component>
        </nav>
        <div id="main-content" class="d-flex flex-column">
            <header-component class="header flex-shrink-0" v-on:sideBarSlide="sideBarSlide" :show_unfold="!show_fold"></header-component>
            <router-view class="router-view flex-grow-1"></router-view>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from "./bar/HeaderComponent";
    import SideBarComponent from "./bar/SideBarComponent";
    export default {
        name: "MainComponent",
        components: {SideBarComponent, HeaderComponent},
        data() {
            return {
                show_fold: false,
            }
        },
        methods: {
            sideBarSlide() {
                const sidebar = document.getElementById('main-sidebar');
                const content = document.getElementById('main-content');
                if(this.show_fold) {
                    this.show_fold = false;
                    sidebar.style['width'] = 63 + 'px';
                    content.style['margin-left'] = 63 + 'px';
                } else {
                    this.show_fold = true;
                    sidebar.style['width'] = 248 + 'px';
                    content.style['margin-left'] = 248 + 'px';
                }
            }
        },
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = "#060524";
            next();
        }
    }
</script>

<style scoped>
    #main {
        width: 100%;
        min-width: 1200px;
        height: 100%;
        display: flex;
        flex-direction: row;
    }
    #main-sidebar {
        /*width: 16.2%;*/
        width: 63px;
        height: 100vh;
        /*???  row  col要不要去掉*/
        position:fixed;
        z-index: 3;
        flex: none;
        background-color: #060524;
        -moz-transition: margin-left 0.2s linear;
        transition: margin-left 0.2s linear;
    }
    /*right part*/
    #main-content {
        position: relative;
        z-index: 2;
        /*margin-left width ???*/
        margin-left: 63px;
        width: 100%;
        min-width: 1140px;
        height: 100vh;
        min-height: 600px;
        border-top-left-radius: 16px;
        overflow: hidden;
        background-color: #FBFBFD;
        -moz-transition: margin-left 0.2s linear;
        transition: margin-left 0.2s linear;
    }
    #main-content .header {
        /*HeaderBar固定高度*/
        height: 10.5vh;
        min-height: 6rem;
    }
    #main-content .router-view {
        height: 89.5%;
        padding: 3.2rem 3.2rem 3.2rem;
    }
</style>