<template>
    <div>
        <div class="modal fade" id="create-product-modal" tabindex="-1" role="dialog" aria-labelledby="createProductModalTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <span class="modal-title" id="createProductModalTitle">新增产品</span>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body d-flex flex-column">
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>产品名称:</span>
                            <div>
                                <input v-model="product_name"/>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>产品定价:</span>
                            <div>
                                <input v-model="product_price"/>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>单位:</span>
                            <div>
                                <input v-model="unit"/>
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between input-box">
                            <span>产品类别:</span>
                            <div class="select-box text-left">
                                <select v-model="product_category">
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
                            <span>产品图片:</span>
                            <div>
                                <input type="file" id="file-upload" @change="handleChange($event)" multiple>
<!--                                    <UploadPictureComponent></UploadPictureComponent>-->
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="button-basic button-grey" data-dismiss="modal">取消</button>
                        <button type="button" class="button-basic" @click="createHandler">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 图片上传机制需要改进
    import UploadPictureComponent from "../../../../components/UploadPictureComponent";
    import {urlCreateProduct, urlProductImg2} from "../../../../utils/urls";
    const msgs = [
        '需求创建成功'
    ]
    export default {
        name: "CreateProductComponent",
        components: {UploadPictureComponent},
        data() {
            return {
                product_name: '',
                product_price: '',
                unit: '',
                product_category: '',
                file: [],
            }
        },
        methods: {
            createHandler() {
                //获取POST请求的参数
                const params = this.initiateData();
                this.$axios
                    .post(urlCreateProduct, params)
                    .then(response => {
                        console.log(JSON.stringify(response.data));
                        //获取对应的product_id
                        const product_id = response.data.data;
                        if(product_id) {
                            //上传图片
                            this.uploadImage(product_id);
                        }
                    })
                    .catch(error => {
                        console.log(error.response.data.error_message);
                    })
            },
            uploadImage(product_id) {
                //product_id是让图片和需求存储时绑定
                //获取POST请求的参数，此处为图片文件
                const params = this.initiateImageData(product_id);
                this.$axios
                    .post(urlProductImg2, params)
                    .then(response => {
                        console.log(response.data);
                        this.showWarning(msgs[0]);
                        this.$emit('createSuccessEvent');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            initiateData() {
                const params = new FormData();
                params.append('product_name', this.product_name);
                params.append('product_category', this.product_category);
                params.append('product_price', this.product_price);
                params.append('user_id', this.getUserId());
                params.append('unit', this.unit);
                console.log(`params: ${params}`);
                return params
            },
            initiateImageData(product_id) {
                const params = new FormData();
                for(let i = 0;i < this.file.length;i++) {
                    params.append('file', this.file[i]);
                }
                params.append('product_id', product_id);
                return params;
            },
            handleChange(event) {
                this.file = event.target.files;
            },
            getUserId() {
                const user_id = this.$store.state.user_info.user_id;
                console.log(`user_id from vuex: ${user_id}`);
                return user_id;
            },
            showWarning(msg) {
                window.alert(msg);
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