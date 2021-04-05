Vue.component('vertical-card', {
    props: ['product'],
    template:`
    <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
            <div class="col-md-4">
            <img :src="src" alt="image">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                    <h5 class="card-title">{{product.product_name}}</h5>
                    <p class="card-text">q-ty: 
                        <input type="number" min="1" max="10" v-model.number="product.quantity" style="width: 45px">
                    </p>
                    <p class="card-text">each: {{product.price}} RUB</p>
                    <p class="card-text">
                        <small class="text-muted"> total: {{total}}
                        </small>
                    </p>
                    <a class="btn btn-primary" @click="$emit('remove', product)">X</a>
                </div>
            </div>
        </div>
    </div>
    `,
    computed: {
        src() {
            return "https://picsum.photos/130/228?random=" + (Math.random()*1000);
        },
        total() {
            return this.product.quantity*this.product.price;
        }
    }
});

Vue.component('cart', {
    template: `
        <div v-show="$root.showCart" class="cart" style="right: 14px;
        position: absolute;
        gap: 20px;
        padding: 20px;
        top: 55px;
        background: white;
        z-index: 1;
        width: 500px;
        box-shadow: 1px 1px 1px 1px;">
            <vertical-card v-for="product of $root.cart" :key="product.id_product" :product="product" @remove="remove(product)">
            </vertical-card>
            <div v-show="isEmpty">The cart is empty</div>
            <div v-show="!isEmpty">total: {{total}} RUB. {{$root.cart.length}} items in the cart</div>
        </div>
    `,
    computed: {
        isEmpty() {
            return this.$root.cart.length===0;
        },
        total() {
            return this.$root.cart.reduce( (acc,curr) => acc + curr.quantity*curr.price,0);
        }
    },
    data() {
        return {
        }
    },
    methods: {
        // syncAdd(product) {
        //     console.log("adding to cart: " + product);
        //     let foundProduct = this.$root.cart.find( p => p.id_product === product.id_product );
        //     console.log(foundProduct);
        //     if (foundProduct) {
        //         foundProduct.quantity++;
        //     } else {
        //         this.$root.cart.push(Object.assign(product, {"quantity": 1}));
        //     }
        //     this.$root.cartFiltered = this.$root.cart;
        // },

        add(product) {
            fetch('https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/addToBasket.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.result ===1) {
                    console.log("adding to cart: " + product);
                    let foundProduct = this.$root.cart.find( p => p.id_product === product.id_product );
                    console.log(foundProduct);
                    if (foundProduct) {
                        foundProduct.quantity++;
                    } else {
                        this.$root.cart.push(Object.assign(product, {"quantity": 1}));
                    }
                    this.$root.cartFiltered = this.$root.cart;
                }
            })
            .catch(err => console.log(err));
        },

        remove(product) {
            fetch('https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/deleteFromBasket.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                if (data.result ===1) {
                    console.log("removing from cart: " + product);
                    product.quantity--;
                    let index = this.$root.cart.findIndex( p=> p.id_product === product.id_product);
                    if (index === -1) {
                        console.log(product + "not found in cart");
                    } else {
                        if (product.quantity===0) {
                            this.$root.cart.splice(index,1);
                        }
                    }
                    this.$root.cartFiltered = this.$root.cart;
                } else {
                    $root.isConnectionError = !$root.isConnectionError;
                }
            }) 
            .catch(err => {
                console.log(err);
                $root.isConnectionError = !$root.isConnectionError;
            });
        },
    },
    mounted() {
    }
});