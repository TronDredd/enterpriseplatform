<template>
    <div class="modal fade" id="img-detail-modal" tabindex="-1" role="dialog" aria-labelledby="imgDetailModalTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header" style="border: none">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
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
    .modal {
        font-size: 1.6rem;
        overflow: hidden;
    }
    .modal-dialog {
        width: 540px;
        background-color: #ffffff;
    }
    .modal-body {
        margin: 1rem;
    }
    .modal-body img {
        width: 100%;
    }
</style>