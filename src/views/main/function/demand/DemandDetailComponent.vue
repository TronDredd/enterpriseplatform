<template>
    <div>
        <div id="demand-detail" class="d-flex flex-column position-relative">
            <CloseComponent></CloseComponent>
            <ListHeader v-bind:list-name="listHeaderName" v-bind:block_color="listBlockColor"></ListHeader>
            <div class="content-box flex-grow-1 d-flex flex-column">
                <div class="info-title">
                    <div>{{ item.title }}</div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>创建者:</span>
                        <div>{{ item.user_name }}</div>
                    </div>
                    <div class="info d-flex flex-column">
                        <span>更新时间:</span>
                        <div>{{ $formatTime(item.update_time) }}</div>
                    </div>
                </div>
                <div class="d-flex flex-row justify-content-between">
                    <div class="info d-flex flex-column">
                        <span>类别:</span>
                        <div>{{ $categoryMap(item.category) }}</div>
                    </div>
                    <div class="info d-flex flex-column">
                        <span>描述:</span>
                        <div>{{ item.description }}</div>
                    </div>
                </div>
                <div>
                    <div class="d-flex flex-column">
                        <span>图片:</span>
                        <div class="info-img d-flex flex-row flex-wrap">
                            <img class="pointer" :src="urlImageBase + img.img" v-for="(img, index) in item.image_list" :key="index" @click="show_image_detail(urlImageBase + img.img)">
                        </div>
                    </div>
                </div>
            </div>
            <ImageDetailModal id="image-detail-modal" :image_url="selected_img_url"></ImageDetailModal>
        </div>
    </div>
</template>

<script>
    import CloseComponent from "../../../../components/CloseComponent";
    import ListHeader from "../../../../components/ListHeader";
    import ImageDetailModal from "./ImageDetailModal";
    import {urlImageBase} from "../../../../utils/urls";

    export default {
        name: "DemandDetailComponent",
        components: {ListHeader, CloseComponent, ImageDetailModal},
        data() {
            return {
                item: JSON.parse(this.$route.query.item),
                urlImageBase: urlImageBase,
                selected_img_url: null,
            }
        },
        methods: {
            show_image_detail(image_url) {
                console.log('show image detail');
                this.selected_img_url = image_url;
                this.$('#image-detail-modal').modal('show');
            }
        },
        computed: {
            listHeaderName() {
                return '需求详情';
            },
            listBlockColor() {
                return 'block-purple';
            }
        }
    }
</script>

<style scoped>
    @import url(../../../../assets/css/tool.css);
    @import url(../../../../assets/css/button.css);
    #demand-detail {
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
    .content-box .info, .content-box .info-title {
        width: 30rem;
        padding: 1rem 0;
    }
    .content-box .info-title {
        font-size: 3rem;
        font-weight: bolder;
        color: rgba(0, 0, 0, 0.8);
    }
    .content-box .info div:nth-child(1) {
        padding-bottom: 0.8rem;
    }
    .content-box .info div:nth-child(2) {
        background:rgba(244,245,249,1);
        border-radius:8px;
        padding: 0.87rem 1.1rem;
        word-break: break-all;
    }
    .content-box .info-img img {
        width: 20rem;
        margin: 0.8rem 2rem 0.8rem 0;
    }
</style>