Vue.component('product', {
    props: ['product'],
    template: `
            <div class="card" style="width: 18rem;">
                <img :src="product.src" class="card-img-top" alt="image">
                <div class="card-body">
                    <h5 class="card-title">{{product.product_name}}</h5>
                    <p class="card-text">{{product.price}} RUB</p>
                    <a class="btn btn-primary" @click="$root.$refs.cart.addToCart(product)">Buy</a>
                </div>
        </div>
    `,

});

Vue.component('products', {
    props: ['products'],
    template: `
        <div class="products" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap: 20px;margin: 30px">
            <product v-for="product of products" :key="product.id_product" :product="product" @add="add"></product>
        </div>
    `,
 
    methods: {
        add(product) {
            console.log("adding to cart!" + product);
            // this.$emit('addParent', product);
            let foundProduct = this.$root.$refs.cart.products.find( p => p.id_product === product.id_product );
            //console.log(foundProduct);
            if (foundProduct) {
                foundProduct.quantity++;
            } else {
                this.$root.$refs.cart.products.push(Object.assign(product, {"quantity": 1}));
            }
        },
    },
   
});