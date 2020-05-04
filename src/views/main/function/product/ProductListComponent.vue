<template>
    <div id="product-list-component">
        <div class="input-box">
            <input type="text" v-model="search_content">
            <select v-model="filter">
                <option value="0">All</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
            </select>
            <button @click="search">搜索</button>
        </div>
        <div>

        </div>
    </div>
</template>

<script>
    import {urlProductList} from "../../../../utils/urls";

    const msgs = [
        '缺少参数',
        '其他异常',
        '查询结果为空'
    ];
    export default {
        name: "ProductListComponent",
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
                this.search_content = query.search_content == null ? this.search_content : query.search_content;
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
                    temp['search_content'] = query['search_content'];
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
            pageSizeWatcher(newVal) {
                this.page_size = Number(newVal);
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
            page_size(newVal) {
                this.page_size =  Number(newVal);
            },
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

</style>