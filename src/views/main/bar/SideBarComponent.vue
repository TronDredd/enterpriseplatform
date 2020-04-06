<template>
    <div id="side-bar" class="text-center">
        <div id="logo" class="bg-263543">
            <a class="color-white">
                <i class="fab fa-google"></i>
            </a>
        </div>
        <ul class="menu-root" id="accordion">
            <li>
                <a id="nav-demand-tab" data-toggle="collapse" data-target="#nav-demand" aria-expanded="false" aria-controls="nav-demand" class="menu-item">
<!--                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="users" class="svg-inline&#45;&#45;fa fa-users fa-w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"></path></svg>-->
                    <span>需求</span>
                </a>
                <ul class="collapse sublist" id="nav-demand" aria-labelledby="nav-demand-tab" data-parent="#accordion">
                    <li>
                        <router-link :to="{path: '/main/demand_list', query:{page_num: 1, page_size: 20, filter: filter}}"><span>需求列表</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/my_demand', query: {page_num: 1, page_size: 20}}"><span>我的需求</span></router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "SideBarComponent",
        data: function() {
            return {
                filter: 0
            }
        },
        methods: {

        },
        mounted() {
            const target = this.$('.router-link-active').parent().parent();
            target.collapse('show');


        }
    }
</script>

<style scoped>
    ul {
        list-style: none;
        padding: 0;
    }
    li {
        /*padding: 1.5vh 1rem;*/
        padding: 1.5vh 0;
        text-align: left;
    }
    li a {
        display: block;
        padding-left: 1rem;
    }
    button {
        width: 100%;
    }
    a {
        cursor: pointer;
    }
    .color-white {
        color: white;
    }
    .sublist li {
        padding: .4rem 0;
    }
    .sublist li a {
        text-align: left !important;
        margin-left: 2rem;
    }
    .sublist li a:hover {
        color: white !important;
        text-decoration: none;
    }
    .menu-root span {
        margin-left: 1rem;
    }
    .menu-item {
        padding: 1.5vh 1.4rem;
    }
    .router-link-active {
        font-weight: 600;
        color: white !important;
    }
    #logo {
        height: 8vh;
        font-size: 2rem;
        background-color: #263543;
    }
    #accordion a {
        color: #a7adbe;
    }

    a[aria-expanded="true"] {
        font-weight: 600;
    }
    /*  手风琴  属性选择器 并列选择器   */
    a[aria-expanded="true"],a[aria-expanded="true"] ~ ul {
        color: white !important;
        background-color: #263543;
        border-left: 5px solid green !important;
    }
</style>