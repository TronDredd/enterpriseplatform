<template>
    <div id="demand-list" class="bg-white color-grey">
        <ListHeader :list-name="list_name"></ListHeader>
        <div class="padding-0-1">
            <div class="d-flex flex-row-reverse padding-1-0">
                <div class="d-flex align-items-center">
                    <!--        第一版简单分类            -->
                    <select v-model="category" class="custom-select-sm margin-left-4">
                        <option value=1>1</option>
                        <option value=2>2</option>
                        <option value=60>60</option>
                        <option value=100>100</option>
                        <option value=150>150</option>
                        <option value=200 selected>200</option>
                    </select>
                    <input type="text" v-model="filter" class="form-control-sm search-input margin-left-8"/>
                    <button class="margin-left-8 btn btn-primary btn-sm">搜索</button>
                </div>
            </div>
            <div>
                <DemandComponent title="xxx" description="xxxxxxxxxxxxxxx" user_name="xxx"></DemandComponent>
            </div>
        </div>
        <div class="paging-component">
            <PagingComponent page_size="20" page_num="1" number="4" last_page="1"></PagingComponent>
        </div>
    </div>
</template>

<script>
    import ListHeader from "../../../components/ListHeader";
    import DemandComponent from "../../../components/DemandComponent";
    import PagingComponent from "../../../components/PagingComponent";
    export default {
        name: "DemandListComponent",
        components: {PagingComponent, DemandComponent, ListHeader},
        data() {
            return {
                list_name: '需求列表',
                filter: '',
                category: 200
            }
        },
    }
</script>

<style scoped>
    .padding-1-0 {
        padding: 1rem 0;
    }
    .padding-0-1 {
        padding: 0 1rem;
    }
    .search-input {
        border: 1px solid rgba( 0, 0, 0, 0.2);
    }
    .paging-component {
        padding-top: 1.2rem;
    }
</style>