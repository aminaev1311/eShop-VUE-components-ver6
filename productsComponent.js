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
    // props: ['products'],
    template: `
        <div class="products" style="display:flex;justify-content:space-between;flex-wrap:wrap;gap: 20px;margin: 30px">
            <product v-for="product of filtered" :key="product.id_product" :product="product" @add="add"></product>
        </div>
    `,
    data() {
        return {
            url: 'https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/catalogData.json',
            products: [],
            filtered: [],
            // [
            // {id: 1, title: 'Macbook', price: 10},
            // {id: 2, title: 'iPad', price: 20},
            // ]
        }
    },
    methods: {
        getData(url) {
            console.log("fetching data from" + this.url );
            return fetch(url)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                this.products = [...data];
                this.filtered = [...data];
                console.log(this.products);
            })
            .catch(err => console.log(err));
        },
        add(product) {
            console.log("adding to cart!" + product);
            // this.$emit('addParent', product);
            let foundProduct = this.$root.$refs.cart.products.find( p => p.id_product === product.id_product );
            console.log(foundProduct);
            if (foundProduct) {
                foundProduct.quantity++;
            } else {
                this.$root.$refs.cart.products.push(Object.assign(product, {"quantity": 1}));
            }
        },
    },
    mounted() {
        this.getData(this.url);
    }
});