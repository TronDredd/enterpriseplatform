<template>
    <div class="modal fade" id="create-demand-modal" tabindex="-1" role="dialog" aria-labelledby="createDemandModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="createDemandModalTitle">创建需求</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <table class="table table-borderless">
                        <tbody>
                            <tr>
                                <td>需求标题:</td>
                                <td>
                                    <textarea v-model="title"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>需求描述:</td>
                                <td>
                                    <textarea v-model="description"></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>需求类别:</td>
                                <td>
                                    <select v-model="category">
                                        <option selected>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>需求图片:</td>
                                <td>
                                    <UploadPictureComponent></UploadPictureComponent>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
                    <button type="button" class="btn btn-primary" @click="createHandler">创建</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import UploadPictureComponent from "../../../../components/UploadPictureComponent";
    import {urlCreateDemand} from "../../../../utils/urls";
    import dateFormat from "../../../../utils/dateFormat";
    const msgs = [
        '需求创建成功'
    ]
    export default {
        name: "CreateDemandComponent",
        components: {UploadPictureComponent},
        data() {
            return {
                title: '',
                description: '',
                category: '',
                file_list: [],
                demand_id: null
            }
        },
        methods: {
            createHandler() {
                const params = this.initiateData();
                this.$axios
                    .post(urlCreateDemand, params)
                    .then(response => {
                        console.log(JSON.stringify(response.data));
                        const data = response.data.data;
                        if(data && data == 'create success') {
                            this.showWarning(msgs[0]);
                        }
                    })
                    .catch(error => {
                        console.log(error.response.data.error_message);
                    })
            },
            initiateData() {
                const params = new FormData()
                params.append('title', this.title);
                params.append('category', this.category);
                params.append('description', this.description);
                params.append('length', this.file_list.length);
                params.append('user_id', this.getUserId());
                params.append('update_time', this.getUpdateTime());
                console.log(`params: ${params}`);
                return params
            },
            getUserId() {
                const user_id = this.$store.state.user_info.user_id;
                console.log(`user_id from vuex: ${user_id}`);
                return user_id;
            },
            getDemandId() {
                return 0;
            },
            showWarning(msg) {
                window.alert(msg);
            }
        },
        mounted() {
            //获取下一个demand_id
            this.demand_id = this.getDemandId();
        }
    }
</script>

<style scoped>

</style>