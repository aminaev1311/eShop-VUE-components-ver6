Vue.component('cartbig', {
    template: `
    <div>
        <div class="cart" style="gap:20px;padding:20px">
            <div v-show="$root.cartFiltered.length===0">Nothing found</div>
            <div v-show="isEmpty">The cart is empty</div>
            <div v-show="!isEmpty">total: {{total}} RUB. {{$root.cart.length}} position(s) in the cart</div>
            <cart-item v-for="product of $root.cartFiltered" :key="product.id_product" :product="product" @remove="remove(product)" @add="add(product)">
            </cart-item>
            <button type="button" class="btn btn-success">Order now</button>
        </div>
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
        log(product, action) {
            console.log(product, action, new Date());
            let logObj = {product: product, action: action, time: new Date()};
            this.$root.http('/stats', "POST", logObj)
            return logObj;
        },
        add(product) {
            let productWithQuantity = Object.assign({quantity: 1}, product);
            let find = this.$root.cart.find(item => item.id_product === product.id_product);
            this.log(product.product_name, action = 'add');
            if (find) {
                find.quantity++;
                this.$root.cartFiltered = this.$root.cart;
                //send put request to update the quantity of the product
                this.$root.http( `/cart/${find.id_product}`, "PUT", {quantity: find.quantity});
            } else {
                //send the newly added product to the server
                this.$root.http(this.$root.cartUrl, "POST", productWithQuantity).then(data => {
                    if (data.result === 1) {
                        console.log("adding to cart: " + product.product_name);
                        this.$root.cart.push(productWithQuantity);
                        this.$root.cartFiltered = this.$root.cart;
                    }
                });
            }
        },

        remove(product) {
            this.log(product.product_name, action = 'remove');
            this.$root.http(this.$root.cartUrl+`/${product.id_product}`, "DELETE")
                .then( data => {
                    if (data.result ===1) {
                        console.log("removing from cart: " + product);
                        let index = this.$root.cart.findIndex( p=> p.id_product === product.id_product);
                        if (index === -1) {
                            console.log(product + "not found in cart");
                        } else {
                            product.quantity--;
                            if (product.quantity===0) {
                                this.$root.cart.splice(index,1);
                            }
                        }
                        this.$root.cartFiltered = this.$root.cart;
                    }
                }
            );
        },
    },
    mounted() {
    }
});