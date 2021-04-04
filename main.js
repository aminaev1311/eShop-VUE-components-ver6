Vue.component( 'search', {
    template:`
        <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" @input="onSearch($event.target.value)">
    `,

    methods: {
        onSearch(value) {
            let regExp = new RegExp(value, 'gi');
            console.log('search started:' + value);

            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(product => regExp.test(product.product_name));
        },
    }
});

const app = new Vue({
    el: "#app",
    data: {
        products: [],
        cart: [],
    }, 
    methods: {
        onSearch(value) {
            let regExp = new RegExp(value, 'gi');
            console.log('search started:' + value);
            // this.$refs.products.filtered = this.$refs.products.products.filter(product => regExp.test(product.product_name));

            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(product => regExp.test(product.product_name));
        },
    },
    mounted() {
        console.log(this);
        //получить товары каталога и корзины с сервера

    }
});