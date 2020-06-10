<template>
    <div>
        <div id="product-detail" class="d-flex flex-column position-relative">
            <CloseComponent></CloseComponent>
            <ListHeader :list-name="listHeaderName" :block_color="listBlockColor"></ListHeader>
            <div class="content-box d-flex flex-row justify-content-between">
                <div class="slider-show">
                    <div class="slides">
                        <input type="radio" v-for="(value, index) in item.image_list" :key="'r' + index" name="r" :id="'r' + index">
                        <div :class="`slide ${'s'+index}`" v-for="(image, index) in item.image_list" :key="index">
                            <img :src="$urlImageBase + image.img">
                        </div>
                    </div>
                    <div class="navigation">
                        <label class="bar" v-for="(value, index) in item.image_list" :key="'l' + index" :for="'r' + index"></label>
                    </div>
                </div>
                <div class="d-flex flex-column text-box">
                    <div class="product-name">
                        <span>{{ item.product_name }}</span>
<!--                        <span>干粉灭火器填充机</span>-->
                    </div>
                    <div class="product-price">
                        <span>￥{{ item.product_price }}</span>
<!--                        <span>￥1200 /套</span>-->
                    </div>
                    <span>商家：</span>
                    <div class="producer">天津超飞泵业</div>
                    <span>订购热线：</span>
                    <div class="telephone">18247385983</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import CloseComponent from "../../../../components/CloseComponent";
    import ListHeader from "../../../../components/ListHeader";
    export default {
        name: "ProductDetailComponent",
        components: {ListHeader, CloseComponent},
        data() {
            return {
                item: JSON.parse(this.$route.query.item),
                selected_img_url: null
            }
        },
        methods: {

        },
        computed: {
            listHeaderName() {
                return '产品详情';
            },
            listBlockColor() {
                return 'block-purple';
            }
        }
    }
</script>

<style scoped>
    #product-detail {
        height: 100%;
        padding: 0 1.2rem;
        background:rgba(255,255,255,1);
        box-shadow:0px 6px 16px 3px rgba(82,82,82,0.1);
        border-radius:8px;
        font-size: 1.9rem;
    }
    .content-box {
        height: 85%;
        width: 75%;
        min-width: 600px;
        margin: 2rem auto auto auto;
        overflow-y: auto;
    }
    .content-box .slider-show {
        position: relative;
        top: 12px;
        left: 12px;
        width: 500px;
        height: 400px;
        overflow: hidden;
        box-shadow: 0px 0px 12px rgba(0 ,0 ,0 , 0.4);
    }
    .content-box .slides {
        width: 5000px;
        height: 400px;
        display: flex;
    }
    .content-box .slide {
        width: 500px;
        height: 400px;
        transition: 0.6s;
    }
    .content-box .slide img {
        width: 100%;
        height: 100%;
    }
    .navigation {
        position: absolute;
        left: 50%;
        bottom: 20px;
        transform: translateX(-50%);
        display: flex;
    }
    .bar {
        width: 50px;
        height: 10px;
        border: 2px solid #000000;
        margin: 6px;
        cursor: pointer;
        transition: 0.4s;
    }
    .bar:hover {
        background: #000000;
    }
    input[name="r"] {
        position: absolute;
        visibility: hidden;
    }
    /*
       A ~ B 通用同级选择器
       相同层级 A元素之后所有同层级的B元素
     */
    #r0:checked ~ .s0 {
        margin-left: 0px;
    }
    #r1:checked ~ .s0 {
        margin-left: -500px;
    }
    #r2:checked ~ .s0 {
        margin-left: -1000px;
    }
    .content-box .text-box {
        padding-top: 2rem;
    }
    .content-box .text-box > div {
        margin-bottom: 1.8rem;
        min-width: 24rem;
        background:rgba(244,245,249,1);
        border-radius:8px;
        padding: 0.87rem 1.1rem;
        word-break: break-all;
    }
    .content-box .product-name {
        font-size: 3rem;
        font-weight: bolder;
    }
    .content-box .product-price {
        font-size: 1.9rem;
        font-weight: 600;
        color: #be0003;
        letter-spacing: 0.4rem;
    }
    .content-box .producer {
        font-size: 1.9rem;
        font-weight: 600;
    }
    .content-box .telephone {
        font-size: 1.9rem;
        font-weight: 600;
    }
</style>