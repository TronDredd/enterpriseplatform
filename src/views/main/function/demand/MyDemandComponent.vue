<template>
    <div>
        <div id="my-demand" class="bg-white d-flex flex-column">
            <ListHeader :list-name="list_name" :block_color="block_color"></ListHeader>
            <div class="d-flex flex-row-reverse align-items-center">
                <button class="button-basic button-green margin-left-8 margin-right-2 margin-bottom-8" @click="createDemandHandler">创建需求</button>
                <div>
                    <!--      筛选        -->

                </div>
            </div>
            <div class="demand-box">
                <DemandSelfComponent v-for="(item, index) in list" :key="index"
                                     v-on:demandDetail="showDemandDetailSelf(item)"
                                     v-on:demandDelete="demandDeleteHandler(item)"
                                     :title="item.title"
                                     :description="item.description"
                                     :update_time="item.update_time"
                                     :img_url="item.image_list.length > 0 ? $urlImageBase + item.image_list[0].img : '../assets/logo/png'">
                </DemandSelfComponent>
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
            <CreateDemandComponent v-on:createSuccessEvent="createSuccessHandler"></CreateDemandComponent>
            <CheckModal modal_id="delete_check_modal"
                        modal_id_title="delete_check_modal_title"
                        v-on:delete="deleteHandler()">
            </CheckModal>
        </div>
    </div>
</template>

<script>
    import ListHeader from "../../../../components/ListHeader";
    import {urlDemandDelete, urlDemandListSelf} from "../../../../utils/urls";
    import DemandSelfComponent from "../../../../components/DemandSelfComponent";
    import PagingComponent from "../../../../components/PagingComponent";
    import CreateDemandComponent from "./CreateDemandModal";
    import CheckModal from "../../../../components/CheckModal";
    import qs from 'qs';

    export default {
        name: "MyDemandComponent",
        components: {CheckModal, CreateDemandComponent, DemandSelfComponent, ListHeader, PagingComponent},
        data() {
            return {
                //列表返回数据
                list: [],
                total: 0,

                //分页
                page_num: 1,
                page_size: 20,
                number: 0,
                last_page: 0,

                selected_item: {},
                selected_delete_demand_id: null
            }
        },
        methods: {
            getMethod(url, params) {
                //发送请求
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
                            this.$alert('查询结果为空', 2);
                        }
                    })
            },
            sendRequest() {
                const page_num = this.$route.query.page_num,
                      page_size = this.$route.query.page_size,
                      user_id = this.$route.query.user_id;

                const params = {
                    params: {
                        page_num: page_num,
                        page_size: page_size,
                        user_id: user_id
                    }
                };
                //整理参数，发送请求
                this.getMethod(urlDemandListSelf, params);

            },
            initiateData(query) {
                this.page_num = query.page_num;
                this.page_size = query.page_size;
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
            showDemandDetailSelf(item) {
                this.selected_item = item;
                const query = {
                    item: JSON.stringify(item)
                };
                this.$router.push({path: 'my_demand_detail', query: query});
            },
            createDemandHandler() {
                this.$('#create-demand-modal').modal('show');
            },
            demandDeleteHandler(item) {
                this.selected_delete_demand_id = item.demand_id;
                this.$('#delete_check_modal').modal('show');
            },
            deleteHandler() {
                const params = {
                    demand_id: this.selected_delete_demand_id
                };
                this.$axios
                    .post(urlDemandDelete, qs.stringify(params))
                    .then(response => {
                        const data = response.data;
                        if(data) {
                            if(data.data && data.data == 'delete success') {
                                console.log('delete success');
                                this.$alert('删除成功', 1);
                                //    刷新
                                this.sendRequest();
                            }
                        }
                    })
            },
            createSuccessHandler() {
                this.$('#create-demand-modal').modal('hide');
                this.initiateData(this.$route.query);
                this.sendRequest();
            }
        },
        computed: {
            list_name() {
                return '我的需求';
            },
            block_color() {
                return 'block-blue';
            }
        },
        watch: {
            '$route'(to) {
                console.log(`Demand self list route update`);
                this.initiateData(to.query);
                this.sendRequest();
            }
        },
        mounted() {
            //赋值data 用于页面显示
            this.initiateData(this.$route.query);
            this.sendRequest();
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/input.css);
    @import url(../../../../assets/css/button.css);
    @import url(../../../../assets/css/tool.css);
    #my-demand {
        padding: 0 1.2rem 1.8rem;
        box-shadow: 10px 10px 30px #d9d9d9,
        -10px -10px 30px #ffffff;
        border-radius:8px;
        max-height: 100%;
        font-size: 1.9rem;
    }
    .demand-box {
        overflow-y: scroll;
        overflow-x: auto;
    }
</style>