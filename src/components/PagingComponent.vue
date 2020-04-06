<template>
    <footer class="d-flex justify-content-center">
        <div>
            <ul class="pagination">
                <li class="page-item pointer"><a class="page-link" @click="formerPage()">&lt;</a></li>
                <li class="page-item"><a class="page-link" href="#">{{page_num}}</a></li>
                <li class="page-item pointer"><a class="page-link" @click="latterPage()">&gt;</a></li>
            </ul>
        </div>
    </footer>
</template>

<script>
    export default {
        name: "PagingComponent",
        props: [
            'page_num',
            'page_size',
            'number',
            'last_page'
        ],
        methods: {
            formerPage() {
                const page_num = this.page_num;
                if(page_num > 1) {
                    this.$emit('formerPage');
                }
            },
            latterPage() {
                const page_num = this.page_num;
                if(page_num < this.last_page) {
                    this.$emit('latterPage');
                }
            }
        }
    }
</script>

<style scoped>

</style>