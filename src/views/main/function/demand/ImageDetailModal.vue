<template>
    <div class="modal fade" id="img-detail-modal" tabindex="-1" role="dialog" aria-labelledby="imgDetailModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
<!--                <div class="modal-header" style="border: none">-->
<!--                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">-->
<!--                        <span aria-hidden="true">&times;</span>-->
<!--                    </button>-->
<!--                </div>-->
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    <img :src="image_url">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DemandDetailModal",
        props: ['image_url'],
    }
</script>

<style scoped>
    @media screen and (min-width: 576px) {
        .modal-dialog {
            max-width: 100000px;
        }
    }
    .modal {
        font-size: 1.6rem;
        overflow: hidden;
    }
    .modal-dialog {
        background-color: transparent;
    }
    .modal-dialog-centered {
        justify-content: center;
    }
    .modal-content {
        width: 800px;
        height: 600px;
    }
    .modal-body {
        /*margin: 1rem;*/
    }
    .modal-body .close {
        position: absolute;
        top: 1rem;
        right: 1rem;
        font-size: 2.4rem;
    }
    .modal-body img {
        width: 100%;
        height: 100%;
    }
</style>