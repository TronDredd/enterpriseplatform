<template>
    <div id="main">
        <nav id="main-sidebar">
            <side-bar-component></side-bar-component>
        </nav>
        <div id="main-content" class="d-flex flex-column">
            <header-component class="header flex-shrink-0"></header-component>
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
        beforeRouteEnter(to, from, next) {
            window.document.body.style.backgroundColor = "#060524";
            next();
        }
    }
</script>

<style scoped>
    #main {
        height: 100%;
    }
    #main-sidebar {
        width: 16.2%;
        height: 100vh;
        /*???  row  col要不要去掉*/
        position:fixed;
        z-index: 25;
        background-color: #060524;
        -moz-transition: margin-left 0.2s linear;
        transition: margin-left 0.2s linear;
    }
    /*right part*/
    #main-content {
        margin-left: 16.2%;
        min-width: 83.8%;
        max-width: 100%;
        height: 100vh;
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