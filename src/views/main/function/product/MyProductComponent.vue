<template>
    <div id="my-product-component">

    </div>
</template>

<script>
    import {urlMyProduct} from "../../../../utils/urls";

    export default {
        name: "MyProductComponent",
        data() {
            return {
                user_id: this.$route.query.user_id == null ? null : this.$route.query.user_id,
                list:[],
            }
        },
        methods: {
            getMethod(url, params) {
                this.$axios
                    .get(url, params)
                    .then(response => {
                        const list = response.data.list;
                        if(list) {
                            console.log(`list: ${JSON.stringify(list)}`);
                            this.list = list;
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            },
            fetchList(user_id) {
                const params = {
                    params: {
                        user_id: user_id
                    }
                };
                this.getMethod(urlMyProduct, params);
            },
            routeFetchList(query) {
                this.user_id = query.user_id;
                this.fetchList(this.user_id);
            }
        },
        mounted() {
            console.log('Enter My Product Component');
            this.routeFetchList(this.$route.query);
        }
    }
</script>

<style scoped>

</style>