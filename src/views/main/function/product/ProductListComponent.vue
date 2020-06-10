<template>
    <div>
        <div id="product-list-component" class="bg-white d-flex flex-column">
            <ListHeader :list-name="listHeaderName" :block_color="listBlockColor"></ListHeader>
            <div class="d-flex flex-row-reverse margin-bottom-8">
                <div class="d-flex margin-right-2">
                    <div class="select-box">
                        <select v-model="filter">
                            <option value=0 selected>{{ $categoryMap(0) }}</option>
                            <option value=1>{{ $categoryMap(1) }}</option>
                            <option value=2>{{ $categoryMap(2) }}</option>
                            <option value=3>{{ $categoryMap(3) }}</option>
                            <option value=4>{{ $categoryMap(4) }}</option>
                            <option value=5>{{ $categoryMap(5) }}</option>
                            <option value=6>{{ $categoryMap(6) }}</option>
                            <option value=7>{{ $categoryMap(7) }}</option>
                            <option value=8>{{ $categoryMap(8) }}</option>
                        </select>
                    </div>
                    <div class="input-box margin-left-8">
                        <input type="text" v-model="search_content" class="search-input">
                    </div>
                    <button @click="search" class="button-basic margin-left-8">搜索</button>
                </div>
            </div>
            <div class="product-box d-flex flex-row flex-wrap">
                <ProductComponent v-for="(item, index) in list" :key="index"
                                  :item="item"
                                  v-on:click.native="productDetailHandler(item)">
                </ProductComponent>
            </div>
            <PagingComponent  v-on:formerPage="formerPage"
                              v-on:latterPage="latterPage"
                              v-on:firstPage="firstPage"
                              v-on:lastPage="lastPage"
                              v-on:jumpPage="jumpPage"
                              :page_size = page_size
                              :page_num = page_num
                              :number = number
                              :last_page = last_page>
            </PagingComponent>
        </div>
    </div>
</template>

<script>
    import {urlProductList} from "../../../../utils/urls";
    import ListHeader from "../../../../components/ListHeader";
    import ProductComponent from "./ProductComponent";
    import PagingComponent from "../../../../components/PagingComponent";

    const msgs = [
        '缺少参数',
        '其他异常',
        '查询结果为空'
    ];
    export default {
        name: "ProductListComponent",
        components: {ProductComponent, ListHeader, PagingComponent},
        data() {
            return {
                filter: this.$route.query.filter == null ? 0 : Number(this.$route.query.filter),
                search_content: null,

                list: [],
                total: 0,

                page_num: this.$route.query.page_num == null ? 1 : Number(this.$route.query.page_num),
                page_size: this.$route.query.page_size == null ? 20 : Number(this.$route.query.page_size),
                number: 0,
                last_page: 0,

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
                        console.log(`list: ${JSON.stringify(list)}, total: ${total}`)
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
            fetchList(page_num, page_size, filter, search_content) {
                 const params = {
                     params: {

                     }
                 };
                 params.params.page_num = page_num;
                 params.params.page_size = page_size;
                 params.params.filter = filter;
                 if(search_content != null) {
                     params.params.search_content = search_content
                 }
                 this.getMethod(urlProductList, params);
            },
            routeFetchList(query) {
                this.page_num = query.page_num == null ? this.page_num : Number(query.page_num);
                this.page_size = query.page_size == null ? this.page_size : Number(query.page_size);
                this.filter = query.filter == null ? this.filter : Number(query.filter);
                this.search_content = query.search_content == null ? null : query.search_content;
                this.fetchList(this.page_num, this.page_size, this.filter, this.search_content);
            },
            search() {
                console.log(`Search Content: ${this.search_content}`);
                const query = this.$route.query, temp = {};
                Object.keys(query).forEach(key => {
                    if(key != 'search_content') {
                        temp[key] = query[key];
                    }
                })
                if(this.search_content != null) {
                    temp['search_content'] = this.search_content;
                }
                console.log(`temp: ${JSON.stringify(temp)}`);
                this.$router.push({query: temp}).catch(() => {});
            },
            formerPage() {
                const query = Object.assign({}, this.$route.query);
                query.page_num--;
                this.$router.push({query: query});
            },
            latterPage() {
                const query = Object.assign({}, this.$route.query);
                query.page_num++;
                this.$router.push({query: query});
            },
            firstPage() {
                const query = Object.assign({}, this.$route.query);
                query.page_num = 1;
                this.$router.push({query: query}).catch(() => {});
            },
            lastPage() {
                const query = Object.assign({}, this.$route.query);
                query.page_num = this.last_page;
                this.$router.push({query: query}).catch(() => {});
            },
            jumpPage(page_num) {
                const query = Object.assign({}, this.$route.query);
                query.page_num = page_num;
                this.$router.push({query: query}).catch(() => {});
            },
            productDetailHandler(item) {
                console.log('Router to product detail');
                const query = {
                    item: JSON.stringify(item)
                };
                this.$router.push({
                    path: '/main/product_detail',
                    query: query
                });
            }
        },
        computed: {
            listHeaderName() {
                return '产品列表';
            },
            listBlockColor() {
                return 'block-blue';
            }
        },
        watch: {
            filter: function(newVal) {
                const query = Object.assign({}, this.$route.query);
                query.filter = newVal;
                this.$router.push({query: query}).catch(() => {});
            },
            '$route'(to) {
                console.log('router has been changed');
                this.routeFetchList(to.query);
            }
        },
        mounted() {
            console.log('enter ProductList Component');
            this.routeFetchList(this.$route.query);
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/input.css);
    @import url(../../../../assets/css/button.css);
    @import url(../../../../assets/css/tool.css);
    #product-list-component {
        padding: 0 1.2rem 1.8rem;
        box-shadow: 10px 10px 30px #d9d9d9,
        -10px -10px 30px #ffffff;
        border-radius:8px;
        max-height: 100%;
        font-size: 1.9rem;
    }
    .product-box {
        overflow-y: scroll;
        overflow-x: auto;
    }
</style>