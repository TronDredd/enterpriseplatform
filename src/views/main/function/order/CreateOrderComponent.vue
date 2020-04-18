<template>
    <div id="create-order">
        <div class="top-title bg-white">
            <span>创建订单</span>
        </div>
        <div>
            <ul>
                <li>
                    <span>
                        <input v-model="title" placeholder="输入标题">
                    </span>
                </li>
                <li>
                    <span>
                        <input v-model="money" placeholder="输入金额" type="number">
                    </span>
                </li>
                <li>
                    <span>
                        <select v-model="category">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                        </select>
                    </span>
                </li>
                <li>
                    <span>
                        <select v-model="buy_in_or_sell">
                            <option value="1" selected>买进</option>
                            <option value="2">卖出</option>
                        </select>
                    </span>
                </li>
                <li>
                    <span>
                        <input v-model="target" placeholder="交易对象">
                    </span>
                </li>
                <li>
                    <span>
                        <input v-model="product" placeholder="产品名称">
                    </span>
                </li>
                <li>
                    <span>
                        <input v-model="amount" placeholder="总量">
                    </span>
                </li>
            </ul>
            <div>
                <button @click="submitHandler">提交</button>
            </div>
        </div>
    </div>
</template>

<script>
    import {urlCreateOrder} from "../../../../utils/urls";

    const msgs = [
        '输入不能为空',
        '订单创建成功'
    ]
    export default {
        name: "CreateOrderComponent",
        data() {
            return {
                title: null,
                money: null,
                category: 1,
                buy_in_or_sell: 1,
                target: null,
                product: null,
                amount: null
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
            },
            getUserId() {
                const user_id = this.$store.state.user_info.user_id;
                console.log(`user_id from vuex: ${user_id}`);
                return user_id;
            },
            showWarning(msg) {
                alert(msg);
            }
        }
    }
</script>

<style scoped>
    #create-order {
        margin: .6rem 1rem;
    }
    .top-title {
        display: inline-block;
        padding: .6rem 1rem;
    }
</style>