<template>
    <div id="demand-list" class="bg-white color-grey">
        <ListHeader :list-name="list_name"></ListHeader>
        <div class="padding-0-1">
            <div class="d-flex flex-row-reverse padding-1-0">
                <div class="d-flex align-items-center">
                    <!--        第一版简单分类            -->
                    <select v-model="filter" class="custom-select-sm margin-left-4">
                        <option value=0 selected>0</option>
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=3>3</option>
                        <option value=4>4</option>
                        <option value=5>5</option>
                    </select>
                    <input type="text" v-model="search_content" class="form-control-sm search-input margin-left-8"/>
                    <button class="margin-left-8 btn btn-primary btn-sm">搜索</button>
                </div>
            </div>
            <div>
                <DemandComponent v-for="(item, index) in list" :key="index" :title="item.title" :description="item.description" :user_name="item.user_name"></DemandComponent>
            </div>
        </div>
        <div class="paging-component">
            <PagingComponent page_size="20" page_num="1" number="4" last_page="1"></PagingComponent>
        </div>
    </div>
</template>

<script>
    import ListHeader from "../../../components/ListHeader";
    import DemandComponent from "../../../components/DemandComponent";
    import PagingComponent from "../../../components/PagingComponent";
    import {urlDemandList} from "../../../utils/urls";

    const msgs = [
        '缺少参数',
        '其他异常'
    ];
    export default {
        name: "DemandListComponent",
        components: {PagingComponent, DemandComponent, ListHeader},
        data() {
            return {
                list_name: '需求列表',
                filter: 0,
                search_content: '',

                //列表返回数据
                list: [],
                total: 0,
            }
        },
        methods: {
            // 发送请求和请求处理分开
            getMethod: function(url, params) {
                //请求处理
                this.$axios
                    .get(url, params)
                    .then(response => {
                        const list = response.data.list;
                        const total = response.data.total;
                        console.log(`list: ${list}, total: ${total}`)
                        if(list && total) {
                            this.list = list;
                            this.total = total;
                        } else {
                            console.log(`缺少返回值`)
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
            sendRequest() {
                //初始化请求列表数据
                const page_num = this.$route.query.page_num,
                    page_size = this.$route.query.page_size,
                    filter = this.$route.query.filter,
                    search_content = this.$route.query.search_content;

                const params = {
                    params: {
                        page_num: page_num,
                        page_size: page_size,
                        filter: filter
                    }
                };
                if(search_content != undefined) {
                    //考虑搜索后刷新的情况
                    params.params['search_content'] = search_content
                }
                //整理参数，发送请求
                this.getMethod(urlDemandList, params)
            },
            showWarning(msg) {
                window.alert(msg);
            }
        },
        mounted() {
            const filter = this.$route.query.filter,
                  search_content = this.$route.query.search_content;
            this.filter = filter == undefined ? this.filter : filter;
            this.search_content = search_content == undefined ? this.search_content : search_content;
            this.sendRequest();
        }
    }
</script>

<style scoped>
    .padding-1-0 {
        padding: 1rem 0;
    }
    .padding-0-1 {
        padding: 0 1rem;
    }
    .search-input {
        border: 1px solid rgba( 0, 0, 0, 0.2);
    }
    .paging-component {
        padding-top: 1.2rem;
    }
</style>