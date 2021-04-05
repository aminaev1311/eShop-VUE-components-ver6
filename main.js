Vue.component( 'search', {
    props: ['products'],
    template:`
        <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" @input="onSearch($event.target.value)">
    `,

    methods: {
        onSearch(value) {
            let regExp = new RegExp(value, 'gi');
            console.log('search started:' + value);

            this.filtered = this.products.filter(product => regExp.test(product.product_name));
            console.log(this.filtered);
        },
    },
    data() {
        return {
            filtered: [],
        }
    }
});

const app = new Vue({
    el: "#app",
    data: {
        products: [],
        filtered: [],
        cart: [],
        cartFiltered: [],
        productsUrl: 'https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/catalogData.json',
        cartUrl: 'https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/getBasket.json', 
    }, 
    methods: {
        onSearch(value) {
            let regExp = new RegExp(value, 'gi');
            console.log('search started:' + value);

            this.$root.filtered = this.$root.products.filter(product => regExp.test(product.product_name));
        },
        getProducts(url) {
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
        getCart(url) {
            console.log("fetching data from" + url );
            return fetch(url)
            .then(response => {
                console.log(response);
                return response.json();
            })
            .then(data => {
                this.cart = [...data.contents];
                console.log(this.cart);
                this.cartFiltered = [...data.contents];
            })
            .catch(err => console.log(err));
        },
    },
    mounted() {
        console.log(this);
        //получить товары каталога и корзины с сервера
        this.getProducts(this.productsUrl);
        this.getCart(this.cartUrl);
    }
});