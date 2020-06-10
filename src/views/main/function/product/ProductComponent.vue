<template>
    <div class="product-component">
        <img :src="item.image_list.length > 0 ? $urlImageBase + item.image_list[0].img : '../assets.logo.png'" width="200" height="160">
        <div class="product-description">
            <span class="product-price">
                ￥{{ item.product_price }}
            </span>
            <span class="product-name">
                {{ item.product_name }}
            </span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductComponent",
        props: ['item']
    }
</script>

<style scoped>
    .product-component {
        margin: 1rem;
        padding: 0.8rem;
        border-radius: 2px;
        transition: all 0.4s ease-in-out;
        cursor: pointer;
    }
    .product-component:hover {
        transform: translateY(-5%) scale(1.01);
        box-shadow: 0 6px 16px #d9d9d9;
    }
    .product-description span {
        display: block;
    }
    .product-description .product-price {
        font-size: 2.4rem;
        font-weight: 800;
        color: firebrick;
    }
    .product-description .product-name {
        font-size: 1.8rem;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.4);
    }
</style>