<template>
    <div>
        <div id="order-detail" class="d-flex flex-column position-relative">
            <CloseComponent></CloseComponent>
            <ListHeader :list-name="listHeaderName" :block_color="listBlockColor"></ListHeader>
            <div class="content-box flex-grow-1 d-flex flex-column">
                <div class="info-title d-flex flex-row justify-content-between">
                    <div>{{ item.title }}</div>
                    <div>
                        <button v-if="show_edit" class="button-basic" @click="modelChange">编辑</button>
                        <button v-if="!show_edit" class="button-basic button-grey margin-left-8" @click="modelChange">取消</button>
                        <button v-if="!show_edit" class="button-basic margin-left-8" @click="submitModification()">提交</button>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>订单编号:</span>
                        <div>{{ item.order_id }}</div>
                    </div>
                    <div class="info d-flex flex-column">
                        <span>更新时间:</span>
                        <div>{{ $formatTime(item.update_time) }}</div>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>订单类别:</span>
                        <div>{{ $categoryMap(item.category) }}</div>
                    </div>
                    <div class="info d-flex flex-column">
                        <span>订单金额:</span>
                        <div v-if="show_edit">￥{{ item.money }}</div>
                        <input v-if="!show_edit" type="text" v-model="item.money">
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>买进或卖出:</span>
                        <div>{{ $buyInOrSellMap(item.buy_in_or_sell) }}</div>
                    </div>
                    <div class="info d-flex flex-column">
                        <span>交易对象:</span>
                        <div>{{ item.target }}</div>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>产品名称:</span>
                        <div v-if="show_edit">{{ item.product }}</div>
                        <input v-if="!show_edit" type="text" v-model="item.product">
                    </div>
                    <div class="info d-flex flex-column">
                        <span>总量:</span>
                        <div v-if="show_edit">{{ item.amount }}{{ item.unit }}</div>
                        <input v-if="!show_edit" type="text" v-model="item.amount">
                    </div>
                </div>
            </div>
    <!--            <loading v-if="showLoading" style="height: 568.8px;background-color: rgba(255, 255, 255, 0.8);"></loading>-->
        </div>
    </div>
</template>

<script>
    import qs from 'qs';
    import CloseComponent from "../../../../components/CloseComponent";
    import ListHeader from "../../../../components/ListHeader";
    import {urlModifyOrder} from "../../../../utils/urls";
    //获取编辑过程中值被修改的属性，并组成一个对象返回
    const findModifiedAttr = (newParam, oldParam) => {
        const result = {};
        for(let i in newParam) {
            if(newParam[i] != oldParam[i]) {
                result[i] = newParam[i];
            }
        }
        console.log(result);
        return result;
    };
    export default {
        name: "OrderDetailComponent",
        components: {CloseComponent, ListHeader},
        data() {
            return {
                item: this.$route.query.item == undefined ? {} : JSON.parse(this.$route.query.item),
                old_item: this.$route.query.item == undefined ? {} : JSON.parse(this.$route.query.item),
                showInfo: false,
                show_edit: true
            }
        },
        methods: {
            modelChange() {
                this.show_edit = !this.show_edit;
            },
            submitModification() {
                const params = findModifiedAttr(this.item, this.old_item);
                if(JSON.stringify(params) == '{}') {
                    return;
                }
                params.order_id = this.item.order_id;
                this.$axios
                    .post(`${urlModifyOrder}`, qs.stringify(params))
                    .then(response => {
                        const result = response.data.result;
                        if(result && result == 'modify success') {
                            this.$alert('订单修改成功', 1);
                            this.modelChange();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.modelChange();
                    })
            }
        },
        computed: {
            listHeaderName() {
                return '订单详情';
            },
            listBlockColor() {
                return 'block-purple';
            }
        },
        mounted() {
            this.showInfo = true;
            this.item = this.$route.query.item == undefined ? {} : JSON.parse(this.$route.query.item);
            this.old_item = this.$route.query.item == undefined ? {} : JSON.parse(this.$route.query.item);
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/tool.css);
    @import url(../../../../assets/css/button.css);
    #order-detail {
        height: 100%;
        padding: 0 1.2rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 3px rgba(82,82,82,0.1);
        border-radius:8px;
        font-size: 1.9rem;
    }
    .content-box {
        height: 85%;
        width: 75%;
        min-width: 600px;
        margin: 2rem auto auto auto;
        overflow-y: auto;
    }
    .content-box .info {
        width: 30rem;
        padding: 1rem 0;
    }
    .content-box .info-title {
        font-size: 3rem;
        font-weight: bolder;
        color: rgba(0, 0, 0, 0.8);
        padding: 1rem 0;
    }
    .content-box .info div:nth-child(1) {
        padding-bottom: 0.8rem;
    }
    .content-box .info div:nth-child(2) {
        background: rgba(244,245,249,1);
        border-radius:8px;
        padding: 0.87rem 1.1rem;
        word-break: break-all;
    }
    .content-box .info input {
        background-color: rgba(244,245,249,1);
        border-radius:8px;
        padding: 0.87rem 1.1rem;
        outline: none;
        border: none;
        font-weight: bolder;
    }
    .content-box .info-img img {
        width: 20rem;
        margin: 0.8rem 2rem 0.8rem 0;
    }
</style>