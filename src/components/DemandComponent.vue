<template>
    <div class="d-flex demand-component">
        <div class="col-9 d-flex flex-row">
            <div class="col-8 d-flex flex-column margin-right-2 text-info-box">
                <span class="title_span">{{ title }}</span>
                <span class="description_span">{{ description }}</span>
                <span class="user_name_span">发布者：{{ user_company }}</span>
            </div>
            <img :src="img_url" class="col-4 flex-shrink-0 demand_img">
        </div>
        <div class="col-3 d-flex flex-row justify-content-end align-items-center">
            <button class="button-basic button-green" @click="userDetail">用户详情</button>
            <button class="button-basic margin-left-8" @click="demandDetail">需求详情</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DemandComponent",
        props: [
            'title',
            'description',
            'user_company',
            'img_url'
        ],
        methods: {
            userDetail() {
                this.$emit('userDetail');
            },
            demandDetail() {
                this.$emit('demandDetail');
            }
        }
    }
</script>

<style scoped>
    .demand-component {
        margin: 1rem;
        padding: 0rem 0 1rem 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    .text-info-box span {
        max-width: 100%;
        text-align: left;
        overflow-x: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .title_span {
        font-size: 3rem;
        font-weight: 800;
        color: rgba(0, 0, 0, 0.8);
    }
    .description_span {
        width: 100%;
        font-size: 1.6rem;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .user_name_span {
        font-size: 1.6rem;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.4);
    }
    .demand_img {
        height: 10rem;
    }
</style>