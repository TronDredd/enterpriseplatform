<template>
    <div id="side-bar" class="text-center">
        <div class="logo-box">
            <div class="logo-img-box">
                <img class="logo-img" src="../../../assets/company_logo.png">
            </div>
            <span>企业购销</span>
            <div class="logo-img-box">
                <img class="fold-img pointer" v-if="show_fold" @click="sideBarSlide" src="../../../assets/fold@a622f7fa.png">
            </div>
        </div>
        <ul class="menu-root" id="accordion">
            <li class="menu-item">
                <a id="nav-demand-tab" data-toggle="collapse" data-target="#nav-demand" aria-expanded="true" aria-controls="nav-demand">
                    <div class="tab-svg-box">
                        <svg class="svg-inline w-20" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
                            <title>ic_usermanage</title>
                            <desc>Created with Sketch.</desc>
                            <g id="ic_usermanage" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g fill-rule="nonzero">
                                    <rect id="矩形" fill="#000000" opacity="0" x="0" y="0" width="30" height="30"></rect>
                                    <path d="M2.32047719,7.70180604 L2.32047719,26.0795567 C2.25161643,26.7647143 2.46296304,27.4485204 2.90519333,27.9713895 C3.34742361,28.4942587 3.98184573,28.8104437 4.66039934,28.8461538 L21.4269463,28.8461538 C22.0753213,28.825681 22.6883922,28.5420153 23.1284049,28.0588949 C23.5684175,27.5757746 23.7984692,26.9337176 23.7668684,26.2769911 L23.7668684,7.70180604 C23.7984692,7.04507956 23.5684175,6.40302256 23.1284049,5.9199022 C22.6883922,5.43678184 22.0753213,5.15311608 21.4269463,5.13264328 L4.66039934,5.13264328 C4.01202429,5.15311608 3.39895339,5.43678183 2.95894077,5.91990219 C2.51892815,6.40302255 2.28887645,7.04507956 2.32047719,7.70180604 Z M15.9679551,14.0259957 C16.008311,14.8278591 15.7268171,15.6121494 15.1875675,16.2002896 C14.5609633,16.6647487 13.8169998,16.9390771 13.0424321,16.9912849 C12.2513222,17.0321893 11.4775496,16.7468691 10.8972967,16.2002896 C10.4390663,15.565168 10.1684168,14.8110919 10.1169091,14.0259957 C10.1684168,13.2408995 10.4390663,12.4868234 10.8972967,11.8517018 C11.4775496,11.3051224 12.2513222,11.0198021 13.0424321,11.0607066 C13.8169998,11.1129143 14.5609632,11.3872427 15.1875675,11.8517018 C15.7265007,12.4395323 16.0079709,13.2233031 15.9679551,14.0247382 L15.9679551,14.0259957 Z M6.21993386,23.5103939 C6.21993386,20.5463623 10.7037507,18.9656292 13.0436728,18.9656292 C15.3835949,18.9656292 19.8674118,20.5463623 19.8674118,23.5103939 L19.8674118,24.8936925 L6.21993386,24.8936925 L6.21993386,23.5103939 Z M8.16904184,1.18018194 L23.7668684,1.18018194 C24.8358703,1.04748384 25.9056205,1.42102435 26.6671665,2.19292192 C27.4287125,2.9648195 27.7972436,4.04911066 27.6663251,5.13264328 L27.6663251,23.9052628 C27.6790458,24.2665758 27.4961292,24.6061001 27.1893651,24.7905816 C26.8826009,24.9750631 26.5009412,24.9750631 26.1941771,24.7905816 C25.8874129,24.6061001 25.7044963,24.2665758 25.7172171,23.9052628 L25.7172171,5.13264328 C25.7172171,3.7493447 25.1328569,3.15704139 23.7681091,3.15704139 L7.19510819,3.15704139 C6.93186059,3.17339427 6.67433619,3.07451924 6.48784277,2.88549084 C6.30134934,2.69646244 6.20380028,2.43543756 6.21993386,2.16861167 C6.20380028,1.90178577 6.30134934,1.64076089 6.48784277,1.45173249 C6.67433619,1.26270409 6.93186059,1.16382906 7.19510819,1.18018194 L8.16904184,1.18018194 Z" id="形状" fill="#FFFFFF"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <span class="tab-text">需求</span>
                </a>
                <ul class="collapse sublist show" id="nav-demand" aria-labelledby="nav-demand-tab">
                    <li>
                        <router-link :to="{path: '/main/demand_list', query:{page_num: 1, page_size: 20, filter: filter, province: 0}}">需求列表</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/my_demand', query: {page_num: 1, page_size: 20, user_id: getUserId}}">我的需求</router-link>
                    </li>
                </ul>
                <ul class="hover-sublist demand-hover-sublist">
                    <li>
                        <span>需求</span>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/demand_list', query:{page_num: 1, page_size: 20, filter: filter, province: 0}}">需求列表</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/my_demand', query: {page_num: 1, page_size: 20, user_id: getUserId}}">我的需求</router-link>
                    </li>
                </ul>
            </li>
            <li class="menu-item">
                <a id="nav-order-tab" data-toggle="collapse" data-target="#nav-order" aria-expanded="true" aria-controls="nav-order">
                    <div class="tab-svg-box">
                        <svg class="svg-inline w-20" viewBox="0 0 30 30" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <!-- Generator: Sketch 64 (93537) - https://sketch.com -->
                            <title>ic_payment manage</title>
                            <desc>Created with Sketch.</desc>
                            <g id="ic_payment-manage" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                <g id="card" transform="translate(2.000000, 6.000000)" fill-rule="nonzero">
                                    <rect id="矩形" fill="#000000" opacity="0" x="3" y="4" width="14" height="14"></rect>
                                    <path d="M1.18181818,6.54545455 L24.8181818,6.54545455 C25.470882,6.54545455 26,7.05829201 26,7.69090909 L26,11.1272727 C26,14.9227364 22.8250455,18 18.9090909,18 L7.09090909,18 C3.17495455,18 0,14.9227364 0,11.1272727 L0,7.69090909 C0,7.05829201 0.529118023,6.54545455 1.18181818,6.54545455 Z M16.8133334,11.4545455 C16.3798511,11.4545455 15.979297,11.6884623 15.7625558,12.0681818 C15.5458147,12.4479013 15.5458147,12.915735 15.7625558,13.2954546 C15.979297,13.6751741 16.3798511,13.9090909 16.8133334,13.9090909 L20.4533333,13.9090909 C20.8868156,13.9090909 21.2873697,13.6751741 21.5041108,13.2954546 C21.7208519,12.915735 21.7208519,12.4479013 21.5041108,12.0681818 C21.2873697,11.6884623 20.8868156,11.4545455 20.4533333,11.4545455 L16.8133334,11.4545455 L16.8133334,11.4545455 Z M2.36363636,0 L23.6363636,0 C24.941764,0 26,1.09893743 26,2.45454545 L26,3.68181818 C26,4.35962219 25.470882,4.90909091 24.8181818,4.90909091 L1.18181818,4.90909091 C0.529118023,4.90909091 0,4.35962219 0,3.68181818 L0,2.45454545 C0,1.09893743 1.05823605,0 2.36363636,0 L2.36363636,0 Z" id="形状" fill="#FFFFFF"></path>
                                </g>
                            </g>
                        </svg>
                    </div>
                    <span class="tab-text">订单</span>
                </a>
                <ul class="collapse sublist show" id="nav-order" aria-labelledby="nav-order-tab">
                    <li>
                        <router-link :to="{path: '/main/order_list', query:{page_num: 1, page_size: 20, filter: 0}}">订单列表</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/create_order'}">创建订单</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/order_statistics', query: {query_time: query_time, time_category: 'month', buy_in_or_sell: 1, chart_category: 'order_number'}}">订单统计</router-link>
                    </li>
                </ul>
                <ul class="hover-sublist order-hover-sublist">
                    <li>
                        <span>订单</span>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/order_list', query:{page_num: 1, page_size: 20, filter: 0}}">订单列表</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/create_order'}">创建订单</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/order_statistics', query: {query_time: query_time, time_category: 'month', buy_in_or_sell: 1}}">订单统计</router-link>
                    </li>
                </ul>
            </li>
            <li class="menu-item">
                <a id="nav-product-tab" data-toggle="collapse" data-target="#nav-product" aria-expanded="true" aria-controls="nav-product">
                    <div class="tab-svg-box">
                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="box-open" class="svg-inline w-20" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="#ffffff" d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"></path></svg>
                    </div>
                    <span class="tab-text">供应</span>
                </a>
                <ul class="collapse sublist show" id="nav-product" aria-labelledby="nav-product-tab">
                    <li>
                        <router-link :to="{path: '/main/product_list', query:{page_num: 1, page_size: 20, filter: 0}}">产品列表</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/my_product', query: {page_num: 1, page_size: 20, user_id: getUserId}}">我的供应</router-link>
                    </li>
                </ul>
                <ul class="hover-sublist supply-hover-sublist">
                    <li>
                        <span>供应</span>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/product_list', query:{page_num: 1, page_size: 20, filter: 0}}">产品列表</router-link>
                    </li>
                    <li>
                        <router-link :to="{path: '/main/my_product', query: {page_num: 1, page_size: 20, user_id: getUserId}}">我的供应</router-link>
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
        props: ['show_fold'],
        data: function() {
            return {
                filter: 0,
                user_info: {},
                query_time: this.getUpdateTime()
            }
        },
        watch: {
            show_fold: function(newVal) {
                if(newVal) {
                    this.$('.collapse').children().show();
                    this.$('.collapse').collapse('show');
                    this.$('.menu-item').removeClass('tab-hover');
                } else {
                    this.$('.collapse').children().hide();
                    this.$('.collapse').collapse('hide');
                    this.$('.menu-item').addClass('tab-hover');
                }
            }
        },
        methods: {
            getUpdateTime() {
                const update_time = new Date()
                return dateFormat('YYYY-mm-dd HH:MM:SS', update_time);
            },
            sideBarSlide() {
                this.$emit('sideBarSlide');
            }
        },
        computed: {
            getUserId() {
                return this.user_info.user_id;
            },
        },
        mounted() {
            this.$('.collapse').children().hide();
            this.$('.collapse').collapse('hide');
            this.$('.menu-item').addClass('tab-hover');
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
    #side-bar {
        background-color: #060524;
    }
    .logo-box {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        overflow: hidden;
    }
    .logo-box .logo-img-box {
        width: 6.4rem;
        height: 6.4rem;
        line-height: 6.4rem;
        flex-shrink: 0;
    }
    .logo-box .logo-img {
        width: 4rem;
        height: 4rem;
    }
    .logo-box span {
        width: 12rem;
        height: 6.4rem;
        line-height: 6.4rem;
        padding-left: 0.8rem;
        text-align: left;
        font-size: 1.9rem;
        font-weight: bold;
        color: #ffffff;
        letter-spacing: 2px;
    }
    .logo-box .fold-img {
        width: 2.4rem;
        height: 2.4rem;
    }
    .menu-root {
        font-size: 1.7rem;
    }
    .menu-root a {
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        letter-spacing: 2px;
    }
    .menu-item {
        margin: 3rem 0;
    }
    .menu-item a {
        display: block;
        height: 4.8rem;
        line-height: 4.8rem;
        overflow: hidden;
    }
    .menu-item a .tab-svg-box {
        display: inline-block;
        width: 6.4rem;
        height: 4.8rem;
        text-align: center;
    }
    ul {
        list-style: none;
        padding: 0;
    }
    li {
        padding: 0;
        text-align: left;
    }
    a {
        cursor: pointer;
    }
    .sublist li {
        height: 4.8rem;
        transition: display 0.6s;
    }
    .sublist li a {
        text-align: left !important;
        padding-left: 6.4rem;
    }
    .sublist li a:hover {
        color: white !important;
        background-color: rgba(26, 22, 141, 0.4);
    }
    .router-link-active {
        font-weight: 600;
        color: white !important;
        background-color: rgba(26, 22, 141, 1);
    }
    a[aria-expanded="true"] {
        font-weight: 600;
    }
    /*  手风琴  属性选择器 并列选择器   */
    a[aria-expanded="true"],a[aria-expanded="true"] ~ ul {
        color: white !important;
    }
    .tab-hover:hover {
        background-color: rgba(26,22,141,0.4);
    }
    .tab-hover:hover .hover-sublist {
        display: block;
    }
    .hover-sublist {
        position: absolute;
        z-index: 99;
        display: none;
        background-color: #060524;
        border-radius: 4px;
        overflow: hidden;
    }
    .demand-hover-sublist {
        top: 94px;
        left: 65px;
    }
    .order-hover-sublist {
        top: 172px;
        left: 65px;
    }
    .supply-hover-sublist {
        top: 250px;
        left: 65px;
    }
    .hover-sublist li {
        width: 20rem;
        height: 4.8rem;
        line-height: 4.8rem;
    }
    .hover-sublist li:hover {
        background-color: #221D7A;
    }
    .hover-sublist li a {
        padding-left: 2rem;
        color: rgba(255, 255, 255, 0.6);
        font-weight: 600;
        letter-spacing: 2px
    }
    .hover-sublist li span {
        padding-left: 2rem;
        color: rgba(255, 255, 255, 0.3);
        font-weight: 800;
        letter-spacing: 2px;
    }
</style>