<template>
    <div>
        <div id="create-order"  class="d-flex flex-column position-relative">
            <ListHeader v-bind:list-name="listHeaderName" v-bind:block_color="listBlockColor"></ListHeader>
            <div class="content-box flex-grow-1 d-flex flex-column">
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>标题:</span>
                        <input v-model="title">
                    </div>
                    <div class="info d-flex flex-column">
                        <span>金额:</span>
                        <input v-model="money" type="number">
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>类别:</span>
                        <div>
                            <select v-model="category">
                                <option value="0" selected>全部</option>
                                <option value="1">{{ $categoryMap(1) }}</option>
                                <option value="2">{{ $categoryMap(2) }}</option>
                                <option value="3">{{ $categoryMap(3) }}</option>
                                <option value="4">{{ $categoryMap(4) }}</option>
                                <option value="5">{{ $categoryMap(5) }}</option>
                                <option value="6">{{ $categoryMap(6) }}</option>
                                <option value="7">{{ $categoryMap(7) }}</option>
                                <option value="8">{{ $categoryMap(8) }}</option>
                            </select>
                        </div>
                    </div>
                    <div class="info d-flex flex-column">
                        <span>买进或卖出:</span>
                        <div>
                            <select v-model="buy_in_or_sell">
                                <option value="1" selected>买进</option>
                                <option value="2">卖出</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>交易对象:</span>
                        <input v-model="target">
                    </div>
                    <div class="info d-flex flex-column">
                        <span>产品名称:</span>
                        <input v-model="product">
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>总量:</span>
                        <input v-model="amount">
                    </div>
                    <div class="info d-flex flex-column">
                        <span>单位:</span>
                        <input v-model="unit">
                    </div>
                </div>
                <div class="d-flex flex-row-reverse">
                    <button class="button-basic" @click="submitHandler">提交</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {urlCreateOrder} from "../../../../utils/urls";
    import ListHeader from "../../../../components/ListHeader";

    const msgs = [
        '输入不能为空',
        '订单创建成功'
    ]
    export default {
        name: "CreateOrderComponent",
        components: {ListHeader},
        data() {
            return {
                title: null,
                money: null,
                category: 1,
                buy_in_or_sell: 1,
                target: null,
                product: null,
                amount: null,
                unit: null
            }
        },
        methods: {
            submitHandler() {
                const params = this.initiateParams();
                if(params == null) {
                    return;
                }
                console.log(`params: ${JSON.stringify(params)}`);
                this.$axios
                    .post(urlCreateOrder, params)
                    .then(response => {
                        const data = response.data.data;
                        if(data && data == 'create success') {
                            //订单创建成功
                            this.showWarning(msgs[1]);
                            //清空输入框的数据
                            this.initiateData();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            initiateParams() {
                if(this.title == null || this.money == null) {
                    this.showWarning(msgs[0]);
                    return null;
                }
                const params = new URLSearchParams();
                params.append('title', this.title);
                params.append('money', this.money);
                params.append('category', this.category);
                params.append('buy_in_or_sell', this.buy_in_or_sell);
                params.append('update_time', this.getUpdateTime());
                params.append('user_id', this.getUserId());
                params.append('target', this.target);
                params.append('product', this.product);
                params.append('amount', this.amount);
                params.append('unit', this.unit);
                console.log(`initiate: ${params}`);
                // user_id  当前时间
                return params;
            },
            initiateData() {
                this.title = null;
                this.money = null;
                this.category = 1;
                this.buy_in_or_sell = 1;
                this.target = null;
                this.product = null;
                this.amount = null;
                this.unit = null;
            },
            getUserId() {
                const user_id = this.$store.state.user_info.user_id;
                console.log(`user_id from vuex: ${user_id}`);
                return user_id;
            },
            showWarning(msg) {
                alert(msg);
            }
        },
        computed: {
            listHeaderName() {
                return '创建订单';
            },
            listBlockColor() {
                return 'block-yellow';
            }
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/tool.css);
    @import url(../../../../assets/css/button.css);
    #create-order {
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
    .content-box > div {
        padding-bottom: 0.8rem;
    }
    .content-box .info span:nth-child(1) {
        padding-bottom: 0.8rem;
    }
    .content-box .info input, .content-box .info select {
        min-width: 265px;
        background:rgba(244,245,249,1);
        border-radius:8px;
        padding: 0.87rem 1.1rem;
        outline: none;
        border: none;
    }
    .content-box .info-img img {
        width: 20rem;
        margin: 0.8rem 2rem 0.8rem 0;
    }
</style>