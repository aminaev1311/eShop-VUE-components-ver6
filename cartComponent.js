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
                    <p class="card-text">q-ty: <input type="number" v-model.number="product.quantity"></p>
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
        <div class="cart" style="gap: 20px;padding: 30px">
            <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" @input="onSearch($event.target.value)">
            <vertical-card v-for="product of products" :key="product.id_product" :product="product" @remove="remove(product)">
            </vertical-card>
        </div>
    `,
    data() {
        return {
            url: 'https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/getBasket.json',
            products: [],
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
                this.products = data.contents;
                console.log(this.products);
            })
            .catch(err => console.log(err));
        },
        remove(product) {
            product.quantity--;
            let index = this.products.findIndex( p=> p.id_product === product.id_product);
            if (product.quantity===0) {
                this.products.splice(index,1);
            }
        },
        // //доделать метод добавления
        // add(product) {

        // }
    },
    mounted() {
        this.getData(this.url);
    }
});