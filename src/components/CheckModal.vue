<template>
<!--  id由外部提供  -->
    <div class="modal fade" :id="modal_id" tabindex="-1" role="dialog" :aria-labelledby="modal_id_title" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <span class="modal-title" :id="modal_id_title">我的需求</span>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <img src="../assets/svg/alert-circle.svg">
                    <span class="margin-left-8">确定删除此项吗？</span>
                </div>
                <div class="modal-footer">
                    <div>
                        <button type="button" class="button-basic button-grey" data-dismiss="modal">取消</button>
                        <button type="button" class="button-basic margin-left-8" @click="confirmHandler">确定</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CheckModal",
        props: [
            'modal_id',
            'modal_id_title'
        ],
        methods: {
            confirmHandler() {
                this.$emit('delete');
                this.$('#delete_check_modal').modal('hide');
            }
        }
    }
</script>

<style scoped>
    @import url(../assets/css/button.css);
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
        font-size: 1.9rem;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.75);
    }
    .modal .modal-footer {
        border-top: none;
    }
    .modal .button-basic {
        font-size: 1.4rem;
    }
</style>