<template>
    <div id="my-demand" class="bg-white color-grey">
        <ListHeader list-name="list_name"></ListHeader>
        <div class="padding-0-1">
            <div class="d-flex flex-row align-items-center padding-1-0">
                <button class="btn btn-success btn-sm" @click="createDemandHandler">创建需求</button>
                <div>
                    <!--      筛选        -->

                </div>
            </div>
            <div>
                <DemandSelfComponent v-for="(item, index) in list" :key="index" v-on:demandDetail="showDemandDetailSelf(item)"
                                     :title="item.title"
                                     :description="item.description">
                </DemandSelfComponent>
            </div>
        </div>
        <PagingComponent  v-on:formerPage="formerPage" v-on:latterPage="latterPage"
                          :page_size = page_size
                          :page_num = page_num
                          :number = number
                          :last_page = last_page>
        </PagingComponent>
        <DemandDetailSelfModal id="demand-detail-modal" :item="selected_item"></DemandDetailSelfModal>
        <CreateDemandComponent></CreateDemandComponent>
    </div>
</template>

<script>
    import ListHeader from "../../../../components/ListHeader";
    import {urlDemandListSelf} from "../../../../utils/urls";
    import DemandSelfComponent from "../../../../components/DemandSelfComponent";
    import PagingComponent from "../../../../components/PagingComponent";
    import DemandDetailSelfModal from "./DemandDetailSelfModal";
    import CreateDemandComponent from "./CreateDemandModal";

    const msgs = [
        '缺少参数',
        '其他异常',
        '缺少返回值'
    ];

    export default {
        name: "MyDemandComponent",
        components: {CreateDemandComponent, DemandSelfComponent, ListHeader, PagingComponent, DemandDetailSelfModal},
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
                            this.showWarning(msgs[2]);
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
            showDemandDetailSelf(item) {
                this.selected_item = item;
                this.$('#demand-detail-modal').modal('show');
            },
            createDemandHandler() {
                this.$('#create-demand-modal').modal('show');
            },
            showWarning(msg) {
                window.alert(msg);
            }
        },
        computed: {
            list_name() {
                return 'My Demand';
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
    .padding-1-0 {
        padding: 1rem 0;
    }
    .padding-0-1 {
        padding: 0 1rem;
    }
</style>