<template>
    <div id="main" class="d-flex">
        <nav id="main-sidebar" class="col-2 bg-304b66">
            <side-bar-component></side-bar-component>
        </nav>
        <div id="main-content" class="col-10">
            <header-component></header-component>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import HeaderComponent from "./bar/HeaderComponent";
    import SideBarComponent from "./bar/SideBarComponent";
    export default {
        name: "MainComponent",
        components: {SideBarComponent, HeaderComponent}
    }
</script>

<style scoped>
    #main-sidebar {
        height: 100vh;
        /*???  row  col要不要去掉*/
        position:fixed;
        padding: 0;
        z-index: 25;
    }
    /*right part*/
    #main-content {
        margin-left: 16.67vw;
        padding: 0;
    }
    .bg-304b66 {
        background-color: #304b66;
    }
    .margin-6-10 {
        margin: .6rem 1rem;
    }
</style>