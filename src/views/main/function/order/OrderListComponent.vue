<template>
    <div id="order-list-component">
        <ListHeader :list-name="list_name"></ListHeader>
        <div class="padding-0-1">
            <div>
                <div class="d-flex flex-row-reverse padding-1-0">
                    <div class="d-flex align-items-center">
                        <select v-model="filter" class="custom-select-sm">
                            <option value="0" selected>all</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                        <input v-model="search_content" class="input-control margin-left-4" placeholder="订单搜索">
                        <button @click="search" class="btn btn-outline-primary btn-sm margin-left-4">搜索</button>
                    </div>
                </div>
                <table class="table text-center bg-white">
                    <thead>
                       <tr>
                           <th scope="col">订单编号</th>
                           <th scope="col">订单标题</th>
                           <th scope="col">类别</th>
                           <th scope="col">买入或卖出</th>
                           <th scope="col">金额</th>
                           <th scope="col">操作</th>
                       </tr>
                    </thead>
                    <tbody>
                       <tr v-for="(item, index) in list" :key="index">
                           <th scope="row">{{ item.order_id }}</th>
                           <td>{{ item.title }}</td>
                           <td>{{ item.category }}</td>
                           <td>{{ item.buy_in_or_sell }}</td>
                           <td>{{ item.money }}</td>
                           <td>
                               <button @click="orderDetailHandler(item)" class="btn btn-outline-success btn-sm">查看详情</button>
                               <button @click="orderDeleteHandler(item.order_id)" class="btn btn-outline-primary btn-sm margin-left-4">删除订单</button>
                           </td>
                       </tr>
                    </tbody>
                </table>
                <PagingComponent v-on:formerPage="formerPage" v-on:latterPage="latterPage"
                                 :page_num = "page_num"
                                 :page_size = "page_size"
                                 :list_length="list.length"
                                 :number = "number"
                                 :last_page="last_page">
                </PagingComponent>
            </div>
        </div>
    </div>
</template>

<script>
    import {urlOrderDelete, urlOrderList} from "../../../../utils/urls";
    import ListHeader from "../../../../components/ListHeader";
    import PagingComponent from "../../../../components/PagingComponent";

    const msgs = [
        '缺少参数',
        '其他异常',
        '查询结果为空',
        '订单删除成功'
    ];
    export default {
        name: "OrderListComponent",
        components: {ListHeader, PagingComponent},
        data() {
            return {
                filter: this.$route.query.filter == undefined ? 0 : Number(this.$route.query.filter),
                search_content: this.$route.query.search_content == undefined ? '' : this.$route.query.search_content,

                page_num: this.$route.query.page_num == undefined ? 0 : Number(this.$route.query.page_num),
                page_size: this.$route.query.paghe_size == undefined ? 0 : Number(this.$route.query.page_size),
                number: 0,
                last_page: 0,

                list: [],
                total: 0,

                selected_item: {}
            }
        },
        methods: {
            getMethod(url, params) {
                this.$axios
                    .get(url, params)
                    .then(response => {
                        const list = response.data.list;
                        const total = response.data.total;
                        console.log(`list: ${JSON.stringify(list)}, total: ${total}`);
                        if(list && total) {
                            this.list = list;
                            this.total = total;
                            this.number = list.length;
                            this.last_page = Math.ceil(total/this.page_size);
                        } else {
                            this.showWarning(msgs[2]);
                            this.$router.back();
                        }
                    })
                    .catch(error => {
                        const error_code = error.response.data.error_code;
                        if(error_code) {
                            switch (error_code) {
                                case '400101':
                                    this.showWarning(msgs[0]);
                                    break;
                                default:
                                    this.showWarning(msgs[1]);
                            }
                        }
                    })
            },
            fetchList(url, page_num, page_size, filter, search_content) {
                const params = {
                    params: {
                        page_num: page_num,
                        page_size: page_size,
                        filter: filter
                    }
                };
                if(search_content != '') {
                    params.params.search_content = search_content;
                }
                console.log(`final params: ${JSON.stringify(params)}`)
                this.getMethod(url, params);
            },
            search() {
                const query = this.$route.query,
                      temp = {};
                Object.keys(query).forEach(key => {
                    if(key != 'search_content') {
                        temp[key] = query[key];
                    }
                });
                if(this.search_content != '') {
                    temp['search_content'] = this.search_content;
                }
                temp.page_num = 1;
                console.log(`search: ${JSON.stringify(temp)}`);
                this.$router.push({query: temp}).catch(() => {});
            },
            //删除订单记录
            orderDeleteHandler(order_id) {
                const query = Object.assign({}, this.$route.query);
                const params = new URLSearchParams();
                params.append('order_id', order_id);
                this.$axios
                    .post(urlOrderDelete, params)
                    .then(response => {
                        const data = response.data.data;
                        if(data && data == 'delete success') {
                            this.showWarning(msgs[3]);
                            this.$router.push({query: query}).catch(() => {});
                        }
                    })
                    .catch(error => {
                        alert(error);
                    })
            },
            routeFetchList(query) {
                const page_num = query.page_num,
                      page_size = query.page_size,
                      filter = query.filter,
                      search_content = query.search_content;
                this.page_num = Number(page_num);
                this.page_size = Number(page_size);
                this.filter = Number(filter);
                this.search_content = search_content;
                this.fetchList(urlOrderList, page_num, page_size, filter, search_content);
            },
            formerPage() {
                const query = Object.assign({}, this.$route.query);
                query.page_num--;
                this.$router.push({query: query}).catch(() => {});
            },
            latterPage() {
                const query = Object.assign({}, this.$route.query);
                query.page_num++;
                this.$router.push({query: query}).catch(() => {});
            },
            orderDetailHandler(item) {
                this.selected_item = item;
                const query = {
                    item: this.selected_item
                }
                //数据在OrderList阶段已经全部传完，OrderDetail组件无需再重新请求数据
                this.$router.push({path: '/main/order_detail', query: query});
            },
            showWarning(msg) {
                alert(msg);
            }
        },
        computed: {
            list_name() {
                return '订单列表';
            }
        },
        watch: {
            '$route'(to) {
                console.log(`Order list route update`);
                this.routeFetchList(to.query);
            },
            filter(newVal) {
                const query = Object.assign({}, this.$route.query);
                query.filter = newVal;
                this.$router.push({query: query}).catch(() => {});
            }
        },
        mounted() {
            this.routeFetchList(this.$route.query);
        }
    }
</script>

<style scoped>
    .padding-0-1 {
        padding: 0 1rem;
    }
    .padding-1-0 {
        padding: 1rem 0;
    }
</style>