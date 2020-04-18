<template>
    <div id="order-detail">
        <div class="selectedcomponent bg-white">
            <i class="fas fa-laptop"></i>
            <span class="margin-left-4">User Info</span>
        </div>
        <div>
            <div class="card padding infobox">
                <ul class="list-group list-group-flush" v-if="showInfo">
                    <li class="list-group-item d-flex justify-content-between align-items-center">
                        <span>
                            <button class="btn btn-success btn-sm" @click="returnHandler">Return</button>
                        </span>
                        <span>
                            <button class="btn btn-secondary btn-sm" @click="modelChange($event)">Edit</button>
                            <button class="btn btn-primary margin-left-4 btn-sm" @click="submitModification()">Submit</button>
                        </span>
                    </li>
                    <!--editable component-->
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">订单编号:</span>
                        <span class="spanTopBottom">{{ item.order_id }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">标题:</span>
                        <span class="spanTopBottom">{{ item.title }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">金额:</span>
                        <span class="spanTopBottom">{{ item.money }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">类别:</span>
                        <span class="spanTopBottom">{{ item.category }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">买进或卖出:</span>
                        <span class="spanTopBottom">{{ item.buy_in_or_sell }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">更新时间:</span>
                        <span class="spanTopBottom">{{ item.update_time }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">交易对象:</span>
                        <span class="spanTopBottom">{{ item.target }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">产品:</span>
                        <span class="spanTopBottom">{{ item.product }}</span>
                    </li>
                    <li class="list-group-item">
                        <span class="d-inline-block fixed-width">总量:</span>
                        <span class="spanTopBottom">{{ item.amount }}</span>
                    </li>
                </ul>
            </div>
<!--            <loading v-if="showLoading" style="height: 568.8px;background-color: rgba(255, 255, 255, 0.8);"></loading>-->
        </div>
    </div>
</template>

<script>
    export default {
        name: "OrderDetailComponent",
        data() {
            return {
                item: this.$route.query.item == undefined ? {} : this.$route.query.item,
                showInfo: false
            }
        },
        methods: {
            returnHandler() {
                this.$router.back();
            }
        },
        mounted() {
            this.showInfo = true;
            this.item = this.$route.query.item == undefined ? {} : this.$route.query.item;
        }
    }
</script>

<style scoped>
    #order-detail {
        margin: .6rem 1rem;
    }
    input {
        padding: .2rem .4rem;
        outline: none;
        border: 1px solid grey;
        border-radius: .25rem;
    }
    .selectedcomponent {
        display: inline-block;
        padding: .6rem 1.2rem;
    }
    .margin-left-4 {
        margin-left: .4rem;
    }
    .padding {
        padding: .4rem .6rem;
    }
    .infobox {
        border: none;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        -webkit-border-top-left-radius: 0;
        -webkit-border-top-right-radius: 0;
    }
    .fixed-width {
        width: 16rem;
    }
    .spanTopBottom {
        display: inline-block;
        padding: .2rem .4rem;
        border: 1px solid white;
    }
</style>