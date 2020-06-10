<template>
    <footer class="d-flex justify-content-center paging-component">
        <div class="d-flex align-items-center">
            <div class="pagination">
                <li class="page-item pointer"><a class="page-link" @click="firstPage()">&lt;&lt;</a></li>
                <li class="page-item pointer"><a class="page-link" @click="formerPage()">&lt;</a></li>
                <li class="page-item"><a class="page-link" href="#">{{page_num}}</a></li>
                <li class="page-item pointer"><a class="page-link" @click="latterPage()">&gt;</a></li>
                <li class="page-item pointer"><a class="page-link" @click="lastPage()">&gt;&gt;</a></li>
            </div>
        </div>
        <div class="page-jump margin-left-8">
            <span>跳转到第</span>
            <input @keydown="enterPress($event)"/>
            <span>页</span>
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
            },
            firstPage() {
                if(this.page_num > 1) {
                    this.$emit('firstPage');
                }
            },
            lastPage() {
                if(this.page_num < this.last_page) {
                    this.$emit('lastPage');
                }
            },
            enterPress(event) {
                if(event.keyCode == 13) {
                    const num = Number(event.target.value);
                    if(!isNaN(num) && num <= this.last_page && num >= 1) {
                        this.$emit('jumpPage', event.target.value);
                        event.target.value = null;
                        event.target.blur();
                    }
                }
            }
        }
    }
</script>

<style scoped>
    .paging-component {
        font-size: 1.4rem;
        padding-top: 0.8rem;
    }
    .page-item {
        width: 3.3rem;
        height: 3.3rem;
        margin-right: 0.8rem;
    }
    .page-link {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 3.3rem;
        border: 1px solid #8E8E8E;
        border-radius: 0.8rem !important;
        color: #5F5F60;
        padding: 0;
    }
    .page-link:hover {
        font-weight: bold;
        color: #ffffff;
        background-color: #8E8E8E;
    }
    .page-link:active {
        background-color: #959596;
    }
    .page-item:nth-child(3) .page-link{
        border: 1px solid #5A8FFF;
        color: #5A8FFF;
    }
    .page-item:nth-child(3) .page-link:hover {
        color: #ffffff;
        background-color: #5A8FFF;
        font-weight: bold;
    }
    .page-jump {
        color: #8E8E8E;
    }
    .page-jump span{
        margin-left: 0.4rem;
    }
    .page-jump input {
        width: 5.6rem;
        padding: 0.5rem 1rem;
        margin-left: 0.4rem;
        border: 1px solid #8E8E8E;
        border-radius: 8px;
    }
</style>