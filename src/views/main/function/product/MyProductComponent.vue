<template>
    <div>
        <div id="my-product-component" class="bg-white d-flex flex-column">
            <ListHeader :list-name="list_name" :block_color="listBlockColor"></ListHeader>
            <div class="d-flex flex-row-reverse">
                <div class="d-flex align-items-center">
                    <div class="input-box">
                        <button class="button-basic button-green margin-right-2" @click="createProductHandler">新增产品</button>
                    </div>
                </div>
            </div>
            <div class="table-div" style="overflow: visible;margin: 0 0 0 -1.2rem;">
                <table class="table table-borderless text-center table-box">
                    <thead class="table-thread">
                    <tr class="row mx-0">
                        <th scope="col" class="col-2">产品编号</th>
                        <th scope="col" class="col-2">产品名称</th>
                        <th scope="col" class="col-2">产品类别</th>
                        <th scope="col" class="col-2">产品价格</th>
                        <th scope="col" class="col-2">单位</th>
                        <th scope="col" class="col-2">操作</th>
                    </tr>
                    </thead>
                </table>
            </div>
            <div class="table-div">
                <table class="table table-borderless text-center table-box">
                    <tbody>
                    <tr v-for="(item, index) in list" :key="index">
                        <th scope="row" class="col-2">{{ item.product_id }}</th>
                        <td class="col-2">{{ item.product_name }}</td>
                        <td class="col-2">{{ $categoryMap(item.product_category) }}</td>
                        <td class="col-2">{{ '￥'+item.product_price }}</td>
                        <td class="col-2">{{ item.unit }}</td>
                        <td class="col-2">
                            <button @click="productDeleteHandler(item.product_id)" class="button-basic button-grey margin-left-8">删除订单</button>
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
            <CreateProductComponent v-on:createSuccessEvent="createSuccessHandler"></CreateProductComponent>
            <CheckModal modal_id="delete_check_modal"
                        modal_id_title="delete_check_modal_title"
                        v-on:delete="deleteHandler()">
            </CheckModal>
        </div>
    </div>
</template>

<script>
    import {urlMyProduct, urlProductDelete} from "../../../../utils/urls";
    import ListHeader from "../../../../components/ListHeader";
    import PagingComponent from "../../../../components/PagingComponent";
    import CheckModal from "../../../../components/CheckModal";
    import qs from 'qs';
    import CreateProductComponent from "./CreateProductModal";
    const msgs = [
        '缺少参数',
        '其他异常',
        '查询结果为空',
        '订单删除成功'
    ];

    export default {
        name: "MyProductComponent",
        components: {CreateProductComponent, ListHeader, PagingComponent, CheckModal },
        data() {
            return {
                user_id: this.$route.query.user_id == null ? null : this.$route.query.user_id,
                page_num: this.$route.query.page_num == undefined ? 0 : Number(this.$route.query.page_num),
                page_size: this.$route.query.paghe_size == undefined ? 0 : Number(this.$route.query.page_size),
                number: 0,
                last_page: 0,

                list:[],
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
                        if(list && total) {
                            this.list = list;
                            this.total = total;
                            this.number = list.length;
                            this.last_page = Math.ceil(total/this.page_size);
                        } else {
                            this.showWarning(msgs[2]);
                            // this.$router.back();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            fetchList(page_num, page_size, user_id) {
                const params = {
                    params: {
                        page_num: page_num,
                        page_size: page_size,
                        user_id: user_id
                    }
                };
                this.getMethod(urlMyProduct, params);
            },
            routeFetchList(query) {
                this.user_id = query.user_id;
                this.page_num = Number(query.page_num);
                this.page_size = Number(query.page_size);
                this.fetchList(this.page_num, this.page_size, this.user_id);
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
            productDetailHandler(item) {
                this.selected_item = item;
                const query = {
                    item: JSON.stringify(item)
                }
                //数据在ProductList阶段已经全部传完，ProductDetail组件无需再重新请求数据
                this.$router.push({path: '/main/product_detail', query: query});
            },
            //删除订单记录
            productDeleteHandler(product_id) {
                this.selected_delete_product_id = product_id;
                this.$('#delete_check_modal').modal('show');
            },
            deleteHandler() {
                const params = {
                    product_id: this.selected_delete_product_id
                };
                this.$axios
                    .post(urlProductDelete, qs.stringify(params))
                    .then(response => {
                        const data = response.data.data;
                        if(data && data == 'delete success') {
                            this.showWarning(msgs[3]);
                            //刷新 重新请求
                            this.routeFetchList(this.$route.query);
                        }
                    })
                    .catch(error => {
                        alert(error);
                    })
            },
            createProductHandler() {
                this.$('#create-product-modal').modal('show');
            },
            createSuccessHandler() {
                this.$('#create-product-modal').modal('hide');
                this.routeFetchList(this.$route.query);
            },
            showWarning(msg) {
                alert(msg);
            }
        },
        computed: {
            list_name() {
                return '我的产品';
            },
            listBlockColor() {
                return 'block-blue';
            }
        },
        mounted() {
            console.log('Enter My Product Component');
            this.routeFetchList(this.$route.query);
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/table.css);
    @import url(../../../../assets/css/button.css);
    @import url(../../../../assets/css/tool.css);
    #my-product-component {
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