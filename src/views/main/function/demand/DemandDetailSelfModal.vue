<template>
    <div class="modal fade" id="demand-detail-self-modal" tabindex="-1" role="dialog" aria-labelledby="demandDetailSelfModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="demandDetailSelfModalTitle">需求详情</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <!--          和container相比，没有随width变化而变化的margin，只有左右各15px的margin          -->
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12 text-left">
                                <h3>{{ item.title }}</h3>
                            </div>
                        </div>
                        <div class="row justify-content-between">
                            <div class="col-8">发布日期:{{ item.update_time }}</div>
                            <div class="col-3">类别:{{ item.category }}</div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <p>{{ item.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DemandDetailSelfModal",
        props: ['item'],
        data() {
            return {

            }
        },
    }
</script>

<style scoped>

</style>