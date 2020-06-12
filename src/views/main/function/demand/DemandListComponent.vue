<template>
    <div>
        <div id="demand-list" class="bg-white d-flex flex-column">
            <ListHeader :list-name="list_name" :block_color="block_color"></ListHeader>
            <div class="d-flex flex-row-reverse margin-bottom-8">
                <div class="d-flex flex-row">
                    <div class="select-box">
                        <!--省份-->
                        <select v-model="province">
                            <option :value=item.index v-for="(item) in province_arr" :key="item.index">{{ item.value }}</option>
                        </select>
                    </div>
                    <div class="select-box margin-left-8">
                    <!--        第一版简单分类            -->
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
                        <input type="text" v-model="search_content" class="search-input" placeholder="输入关键字"/>
                        <button class="button-basic margin-left-8 margin-right-2" @click="search">搜索</button>
                    </div>
                </div>
            </div>
            <div class="demand-box">
                <DemandComponent v-for="(item, index) in list" :key="index"
                                 v-on:userDetail="showUserDetail(item)"
                                 v-on:demandDetail="showDemandDetail(item)"
                                 :title="item.title"
                                 :description="item.description"
                                 :user_company="item.company_name"
                                 :img_url="item.image_list.length > 0 ? $urlImageBase + item.image_list[0].img : '../assets/logo.png'">
                </DemandComponent>
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
<!--            <DemandDetailModal :item="selected_item"></DemandDetailModal>-->
        </div>
    </div>
</template>

<script>
    import ListHeader from "../../../../components/ListHeader";
    import DemandComponent from "../../../../components/DemandComponent";
    import PagingComponent from "../../../../components/PagingComponent";
    import {urlDemandDetail, urlDemandList} from "../../../../utils/urls";
    import provinceArr from "../../../../utils/province";

    export default {
        name: "DemandListComponent",
        components: {PagingComponent, DemandComponent, ListHeader},
        data() {
            return {
                filter: 0,
                search_content: '',
                province: 0,

                //列表返回数据
                list: [],
                total: 0,

                //分页
                page_num: 1,         //default the first page
                page_size: 20,
                number: 0,   //the number of records in current page
                last_page: 0,

                selected_item: {},
                province_arr: provinceArr
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
                        console.log(`list: ${JSON.stringify(list)}, total: ${total}`)
                        if(list && total) {
                            this.list = list;
                            this.total = total;
                            this.number = list.length;
                            this.last_page = Math.ceil(total/this.page_size);
                        } else {
                            this.$alert('查询结果为空');
                            this.search_content = '';
                        }
                    })
            },
            sendRequest() {
                //初始化请求列表数据
                const page_num = this.$route.query.page_num,
                    page_size = this.$route.query.page_size,
                    filter = this.$route.query.filter,
                    province = this.$route.query.province,
                    search_content = this.$route.query.search_content;

                const params = {
                    params: {
                        page_num: page_num,
                        page_size: page_size,
                        filter: filter,
                        province: province
                    }
                };
                if(search_content != undefined) {
                    //考虑搜索后刷新的情况
                    params.params['search_content'] = search_content
                }
                //整理参数，发送请求
                this.getMethod(urlDemandList, params)
            },
            search() {
                //只需改变路由
                const search_content = this.search_content;
                if(search_content) {
                    const query = Object.assign({}, this.$route.query);
                    query.search_content = search_content;
                    this.$router.push({query: query});
                }
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
            initiateData(query) {
                //data数据赋值
                this.page_num = query.page_num;
                this.page_size = query.page_size;
                this.filter = query.filter;
                this.province = query.province;
                this.search_content = query.search_content == undefined ? '' : query.search_content;
            },
            showUserDetail(item) {
                const params = {
                    user_id: item.user_id,
                    user_name: item.user_name,
                    company_name: item.company_name,
                    address: item.address,
                    telephone: item.telephone,
                    industry: item.industry
                };
                const query = {
                    item: JSON.stringify(params)
                };
                this.$router.push({path: '/main/user_info', query: query});
            },
            showDemandDetail(item) {
                this.selected_item = item;
                const query = {
                    item: JSON.stringify(item)
                };
                // this.$('#demand-detail-modal').modal('show');
                this.$router.push({path: urlDemandDetail, query: query});
            }
        },
        watch: {
            '$route'(to) {
                console.log(`Demand list route update`);
                this.initiateData(to.query);
                this.sendRequest();
            },
            filter: function(newVal) {
                console.log(`filter has changed`);
                const query = Object.assign({}, this.$route.query);
                query.filter = newVal;
                this.$router.push({query: query}).catch(() => {});
            },
            province: function(newVal) {
                console.log('province has changed');
                const query = Object.assign({}, this.$route.query);
                query.province = newVal;
                this.$router.push({query: query}).catch(() => {});
            }
        },
        computed: {
            list_name() {
                return "需求列表";
            },
            block_color() {
                return 'block-blue';
            }
        },
        mounted() {//mounted生命周期函数
            console.log('Demand list mounted');
            setTimeout(() => {
                document.body.classList.add("document-loaded")
            }, 100);
            // 赋值data 将路由对象route中的参数赋给组件的data
            this.initiateData(this.$route.query);
            //发送请求
            this.sendRequest();
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/input.css);
    @import url(../../../../assets/css/button.css);
    @import url(../../../../assets/css/tool.css);
    #demand-list {
        padding: 0 1.2rem 1.8rem;
        box-shadow: 10px 10px 30px #d9d9d9,
        -10px -10px 30px #ffffff;
        border-radius:8px;
        max-height: 100%;
        font-size: 1.9rem;
        transform: translateY(4%);
        opacity: 0;
        transition: all .4s linear .2s;
    }
    .document-loaded #demand-list {
        transform: translateY(0);
        opacity: 1;
    }
    .demand-box {
        overflow-y: scroll;
        overflow-x: auto;
    }
</style>