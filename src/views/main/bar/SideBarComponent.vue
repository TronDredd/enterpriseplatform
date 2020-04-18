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
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="box-open" class="svg-inline w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"></path></svg>
                    <span>需求</span>
                </a>
                <ul class="collapse sublist" id="nav-demand" aria-labelledby="nav-demand-tab" data-parent="#accordion">
                    <li>
                        <router-link :to="{path: '/main/demand_list', query:{page_num: 1, page_size: 20, filter: filter}}"><span>需求列表</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/my_demand', query: {page_num: 1, page_size: 20, user_id: getUserId}}"><span>我的需求</span></router-link>
                    </li>
                </ul>
            </li>
            <li>
                <a id="nav-order-tab" data-toggle="collapse" data-target="#nav-order" aria-expanded="false" aria-controls="nav-order" class="menu-item">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="box-open" class="svg-inline w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"></path></svg>
                    <span>订单</span>
                </a>
                <ul class="collapse sublist" id="nav-order" aria-labelledby="nav-order-tab" data-parent="#accordion">
                    <li>
                        <router-link :to="{path: '/main/order_list', query:{page_num: 1, page_size: 20, filter: 0}}"><span>订单列表</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/create_order'}"><span>创建订单</span></router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/order_statistics', query: {query_time: query_time, time_category: 'month', buy_in_or_sell: 1}}"><span>订单统计</span></router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script>
    import dateFormat from "../../../utils/dateFormat";

    export default {
        name: "SideBarComponent",
        data: function() {
            return {
                filter: 0,
                user_info: {},
                query_time: this.getUpdateTime()
            }
        },
        methods: {
            getUpdateTime() {
                const update_time = new Date()
                return dateFormat('YYYY-mm-dd HH:MM:SS', update_time);
            }
        },
        computed: {
            getUserId() {
                return this.user_info.user_id;
            },
        },
        mounted() {
            const target = this.$('.router-link-active').parent().parent();
            target.collapse('show');

            //对filter赋值
            const user_info = this.$store.state.user_info;
            //暂时
            this.user_info = user_info;
            if(user_info) {
                const industry = user_info.industry;
                this.filter = industry;
            }
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
        padding: .4rem 2.4rem;
    }
    .sublist li a {
        display: inline;
        text-align: left !important;
        padding-left: 2rem;
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
    #accordion li {
        padding-bottom: 1rem;
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