<template>
    <div class="d-flex demand-component">
        <div class="col-8 d-flex flex-column">
            <span class="title_span">{{ title }}</span>
            <span class="description_span">{{ description }}</span>
        </div>
        <div class="col-4 d-flex justify-content-center align-items-center">
            <button class="btn btn-primary margin-left-4" @click="demandDetail">需求详情</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DemandSelfComponent",
        props: [
            'title',
            'description'
        ],
        methods: {
            demandDetail() {
                this.$emit('demandDetail');
            }
        }
    }
</script>

<style scoped>
    span {
        text-align: left;
    }
    .title_span {
        font-size: 30px;
        font-weight: 600;
    }
    .description_span {
        width: 100%;
        font-size: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .demand-component {
        margin-bottom: 1rem;
        padding: 0.8rem 0.4rem;
        border-radius: 4px;
        border: 1px solid rgba(0, 0, 0, 0.2);
    }
</style>