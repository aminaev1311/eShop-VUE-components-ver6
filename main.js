const app = new Vue({
    el: "#app",
    data: {
        products: [],
        filtered: [],
        cart: [],
        cartFiltered: [],
        productsUrl: 'https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/catalogData.json',
        cartUrl: 'https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/getBasket.json',
        showCart: false,
        isConnectionError: false,
    }, 
    methods: {
        onSearch(value) {
            let regExp = new RegExp(value, 'gi');
            console.log('search started:' + value);

            this.$root.filtered = this.$root.products.filter(product => regExp.test(product.product_name));
        },
        getProducts(url) {
            console.log("fetching data from" + url );
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
            .catch(err => {
                console.log(err);
                this.$root.isConnectionError = !this.$root.isConnectionError;
            });
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
            .catch(err => {
                console.log(err);
                this.$root.isConnectionError = !this.$root.isConnectionError;
            });
        },
    },
    mounted() {
        console.log(this);
        //получить товары каталога и корзины с сервера
        this.getProducts(this.productsUrl);
        this.getCart(this.cartUrl);
    }
});