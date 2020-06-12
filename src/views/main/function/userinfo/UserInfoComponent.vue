<template>
    <div>
        <div id="user-info" class="d-flex flex-column position-relative">
            <CloseComponent></CloseComponent>
            <ListHeader :list-name="listHeaderName" :block_color="listBlockColor"></ListHeader>
            <div v-if="show_info" class="content-box flex-grow-1 d-flex flex-column">
                <div class="info-title d-flex flex-row justify-content-between">
                    <div></div>
                    <div v-if="is_editable">
                        <button v-if="show_edit" class="button-basic" @click="modelChange">编辑</button>
                        <button v-if="!show_edit" class="button-basic button-grey margin-left-8" @click="modelChange">取消</button>
                        <button v-if="!show_edit" class="button-basic margin-left-8" @click="submitModification()">保存</button>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>用户名:</span>
                        <div>{{ item.user_name }}</div>
                    </div>
                    <div class="info d-flex flex-column">
                        <span>企业名称:</span>
                        <div v-if="show_edit">{{ item.company_name }}</div>
                        <input v-if="!show_edit" type="text" v-model="item.company_name">
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>具体地址:</span>
                        <div v-if="show_edit">{{ item.address }}</div>
                        <input v-if="!show_edit" type="text" v-model="item.address">
                    </div>
                    <div class="info d-flex flex-column">
                        <span>联系方式:</span>
                        <div v-if="show_edit">{{ item.telephone }}</div>
                        <input v-if="!show_edit" type="text" v-model="item.telephone">
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>行业类别:</span>
                        <div>{{ $categoryMap(item.industry) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CloseComponent from "../../../../components/CloseComponent";
    import ListHeader from "../../../../components/ListHeader";
    import qs from 'qs';
    import {urlModifyUserInfo} from "../../../../utils/urls";
    const findModifiedAttr = (newParam, oldParam) => {
        const result = {};
        for(let i in newParam) {
            if(newParam[i] != oldParam[i]) {
                result[i] = newParam[i];
            }
        }
        console.log(result);
        return result;
    };
    export default {
        name: "UserInfoComponent",
        components: {ListHeader, CloseComponent},
        data() {
            return {
                show_info: false,
                show_edit: true,
                item: null,
                old_item: Object.assign({}, this.$route.query.item),
                is_editable: false
            }
        },
        methods: {
            modelChange() {
                this.show_edit = !this.show_edit;
            },
            submitModification() {
                const params = findModifiedAttr(this.item, this.old_item);
                if(JSON.stringify(params) == '{}') {
                    return;
                }
                params.user_id = this.item.user_id;
                this.$axios
                    .post(`${urlModifyUserInfo}`, qs.stringify(params))
                    .then(response => {
                        const result = response.data.result;
                        if(result && result == 'modify success') {
                            this.$alert('用户信息修改成功');
                            this.modelChange();
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        this.modelChange();
                    })
            }
        },
        computed: {
            listHeaderName() {
                return '用户详情';
            },
            listBlockColor() {
                return 'block-purple'
            }
        },
        mounted() {
            const selected_user_id = JSON.parse(this.$route.query.item).user_id;
            const user_id = this.$store.state.user_info.user_id;
            this.is_editable = selected_user_id == user_id ;
            this.item = JSON.parse(this.$route.query.item);
            this.show_info = true;
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/tool.css);
    @import url(../../../../assets/css/button.css);
    #user-info {
        height: 100%;
        padding: 0 1.2rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 3px rgba(82,82,82,0.1);
        border-radius:8px;
        font-size: 1.9rem;
    }
    .content-box {
        height: 85%;
        width: 75%;
        min-width: 600px;
        margin: 2rem auto auto auto;
        overflow-y: auto;
    }
    .content-box .info {
        width: 30rem;
        padding: 1rem 0;
    }
    .content-box .info input {
        background-color: rgba(244,245,249,1);
        border-radius:8px;
        padding: 0.87rem 1.1rem;
        outline: none;
        border: none;
        font-weight: bolder;
    }
    .content-box .info span:nth-child(1) {
        padding-bottom: 0.8rem;
    }
    .content-box .info div:nth-child(2) {
        background:rgba(244,245,249,1);
        border-radius:8px;
        padding: 0.87rem 1.1rem;
        word-break: break-all;
    }
</style>