Vue.component('product', {
    props: ['product'],
    template: `
            <div class="card" style="width: 18rem;">
                <img :src="src" class="card-img-top" alt="image">
                <div class="card-body">
                    <h5 class="card-title">{{product.product_name}}</h5>
                    <p class="card-text">{{product.price}} RUB</p>
                    <a class="btn btn-primary" @click="$emit('add', product)">Buy</a>
                </div>
        </div>
    `,
    computed: {
        src() {
            return "https://picsum.photos/200/200?random=" + (Math.random()*1000);
        }
    }
});

Vue.component('products', {
    props: ['products'],
    template: `
        <div class="products" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap: 20px;margin: 30px">
            <product v-for="product of products" :key="product.id_product" :product="product" @add="$root.$refs.cart.add"></product>
        </div>
    `,
    data() {
        return {
        }
    },
    methods: {
        
    },
    mounted() {
        // this.getData(this.url);
    }
});