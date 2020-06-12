<template>
    <div>
        <div class="modal fade" id="create-demand-modal" tabindex="-1" role="dialog" aria-labelledby="createDemandModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="modal-title" id="createDemandModalTitle">创建需求</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>需求标题:</span>
                            <div>
                                <textarea v-model="title"></textarea>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>需求描述:</span>
                            <div>
                                <textarea v-model="description"></textarea>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>需求类别:</span>
                            <div class="select-box text-left">
                                <select v-model="category">
                                    <option value="1" selected>{{$categoryMap(1)}}</option>
                                    <option value="2">{{$categoryMap(2)}}</option>
                                    <option value="3">{{$categoryMap(3)}}</option>
                                    <option value="4">{{$categoryMap(4)}}</option>
                                    <option value="4">{{$categoryMap(5)}}</option>
                                    <option value="4">{{$categoryMap(6)}}</option>
                                    <option value="4">{{$categoryMap(7)}}</option>
                                    <option value="4">{{$categoryMap(8)}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>需求图片:</span>
                            <div>
                                <input type="file" id="file-upload" @change="handleChange($event)" multiple>
<!--                                    <UploadPictureComponent></UploadPictureComponent>-->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="button-basic button-grey" data-dismiss="modal">取消</button>
                        <button type="button" class="button-basic" @click="createHandler">创建</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 图片上传机制需要改进
    import UploadPictureComponent from "../../../../components/UploadPictureComponent";
    import {urlCreateDemand, urlDemandImg2} from "../../../../utils/urls";
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
                file: [],
            }
        },
        methods: {
            createHandler() {
                //获取POST请求的参数
                const params = this.initiateData();
                this.$axios
                    .post(urlCreateDemand, params)
                    .then(response => {
                        console.log(JSON.stringify(response.data));
                        //获取对应的demand_id
                        const demand_id = response.data.data;
                        if(demand_id) {
                            //上传图片
                            this.uploadImage(demand_id);
                        }
                    })
                    .catch(error => {
                        console.log(error.response.data.error_message);
                    })
            },
            uploadImage(demand_id) {
                //demand_id是让图片和需求存储时绑定
                //获取POST请求的参数，此处为图片文件
                const params = this.initiateImageData(demand_id);
                this.$axios
                    .post(urlDemandImg2, params)
                    .then(response => {
                        console.log(response.data);
                        this.$alert('需求创建成功', 1);
                        this.$emit('createSuccessEvent');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            initiateData() {
                const params = new FormData()
                params.append('title', this.title);
                params.append('category', this.category);
                params.append('description', this.description);
                params.append('user_id', this.getUserId());
                params.append('update_time', this.getUpdateTime());
                console.log(`params: ${params}`);
                return params
            },
            initiateImageData(demand_id) {
                const params = new FormData();
                for(let i = 0;i < this.file.length;i++) {
                    params.append('file', this.file[i]);
                }
                params.append('demand_id', demand_id);
                return params;
            },
            handleChange(event) {
                this.file = event.target.files;
            },
            getUserId() {
                const user_id = this.$store.state.user_info.user_id;
                console.log(`user_id from vuex: ${user_id}`);
                return user_id;
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/button.css);
    @import url(../../../../assets/css/input.css);
    .modal {
        font-size: 1.6rem;
    }
    .modal .modal-content {
        padding: 1.6rem 1.6rem;
        border-radius: 8px;
    }
    .modal .modal-header {
        border-bottom: none;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.55);
    }
    .modal .modal-header .close {
        font-size: 1.9rem;
    }
    .modal .modal-body {
        font-size: 1.6rem;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.65);
    }
    .modal .modal-footer {
        border-top: none;
    }
    .modal .button-basic {
        font-size: 1.4rem;
    }
    .input-box {
        padding: 0.8rem 0;
    }
    .input-box span {
        width: 10rem;
        font-size: 1.9rem;
    }
    .input-box input {
        width: 30rem;
        font-size: 1.6rem;
        border: none;
        border-radius: 8px;
        background-color: rgba(244,245,249,1);
        padding: 0.8rem 1rem;
    }
    .input-box textarea {
        width: 30rem;
        height: 12rem;
        padding: 0.8rem 1rem;
        outline: none;
        border: 0;
        border-radius: 8px;
        background-color: rgba(244,245,249,1);
        resize: none;
    }
</style>