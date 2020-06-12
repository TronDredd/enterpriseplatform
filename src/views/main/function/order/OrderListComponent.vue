<template>
    <div>
        <div id="order-list-component" class="bg-white d-flex flex-column">
            <ListHeader :list-name="list_name" :block_color="listBlockColor"></ListHeader>
            <div class="d-flex flex-row-reverse">
                <div class="d-flex align-items-center">
                    <div class="select-box">
                        <select v-model="filter">
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
                    <div class="input-box">
                        <input v-model="search_content" class="search-input margin-left-8" placeholder="订单搜索">
                        <button @click="search" class="button-basic margin-left-8 margin-right-2">搜索</button>
                    </div>
                </div>
            </div>
            <div class="table-div" style="overflow: visible;margin: 0 0 0 -1.2rem;">
                <table class="table table-borderless text-center table-box">
                    <thead class="table-thread">
                    <tr class="row mx-0">
                        <th scope="col" class="col-2">订单编号</th>
                        <th scope="col" class="col-2">订单标题</th>
                        <th scope="col" class="col-2">类别</th>
                        <th scope="col" class="col-2">买入或卖出</th>
                        <th scope="col" class="col-2">金额</th>
                        <th scope="col" class="col-2">操作</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="table-div">
                <table class="table table-borderless text-center table-box">
                    <tbody>
                       <tr v-for="(item, index) in list" :key="index">
                           <th scope="row" class="col-2">{{ item.order_id }}</th>
                           <td class="col-2">{{ item.title }}</td>
                           <td class="col-2">{{ $categoryMap(item.category) }}</td>
                           <td class="col-2">{{ $buyInOrSellMap(item.buy_in_or_sell) }}</td>
                           <td class="col-2">{{ '￥'+item.money }}</td>
                           <td class="col-2">
                               <button @click="orderDetailHandler(item)" class="button-basic">查看详情</button>
                               <button @click="orderDeleteHandler(item.order_id)" class="button-basic button-grey margin-left-8">删除订单</button>
                           </td>
                       </tr>
                    </tbody>
                </table>
            </div>
            <PagingComponent v-on:formerPage="formerPage" v-on:latterPage="latterPage"
                             :page_num = "page_num"
                             :page_size = "page_size"
                             :list_length="list.length"
                             :number = "number"
                             :last_page="last_page">
            </PagingComponent>
            <CheckModal modal_id="delete_check_modal"
                        modal_id_title="delete_check_modal_title"
                        v-on:delete="deleteHandler()">
            </CheckModal>
        </div>
    </div>
</template>

<script>
    import {urlOrderDelete, urlOrderList} from "../../../../utils/urls";
    import ListHeader from "../../../../components/ListHeader";
    import PagingComponent from "../../../../components/PagingComponent";
    import CheckModal from "../../../../components/CheckModal";
    import qs from 'qs';

    const msgs = [
        '缺少参数',
        '其他异常',
        '查询结果为空',
        '订单删除成功'
    ];
    export default {
        name: "OrderListComponent",
        components: {ListHeader, PagingComponent, CheckModal},
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

                selected_item: {},
                selected_delete_order_id: null
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
                            this.$alert('查询结果为空');
                            this.$router.back();
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
                    item: JSON.stringify(item)
                }
                //数据在OrderList阶段已经全部传完，OrderDetail组件无需再重新请求数据
                this.$router.push({path: '/main/order_detail', query: query});
            },
            //删除订单记录
            orderDeleteHandler(order_id) {
                this.selected_delete_order_id = order_id;
                this.$('#delete_check_modal').modal('show');
            },
            deleteHandler() {
                const params = {
                    order_id: this.selected_delete_order_id
                };
                this.$axios
                    .post(urlOrderDelete, qs.stringify(params))
                    .then(response => {
                        const data = response.data.data;
                        if(data && data == 'delete success') {
                            this.$alert('订单删除成功');
                            //刷新 重新请求
                            this.routeFetchList(this.$route.query);
                        }
                    })
                    .catch(error => {
                        alert(error);
                    })
            }
        },
        computed: {
            list_name() {
                return '订单列表';
            },
            listBlockColor() {
                return 'block-blue';
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
    @import url(../../../../assets/css/table.css);
    @import url(../../../../assets/css/button.css);
    @import url(../../../../assets/css/tool.css);
    #order-list-component {
        padding: 0 1.2rem 1.8rem;
        /*box-shadow:0px 6px 16px 3px rgba(82,82,82,0.1);*/
        box-shadow: 10px 10px 30px #d9d9d9,
        -10px -10px 30px #ffffff;
        border-radius:8px;
        max-height: 100%;
        font-size: 1.9rem;
    }
    .input-box .search-input {
        border: 1px solid #DBDBDB;
        border-radius: 0.8rem;
        padding: 0.6rem 1rem;
    }
    input {
        outline: none;
    }
</style>