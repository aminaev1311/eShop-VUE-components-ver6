Vue.component('nav-bar',{
    template:`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="flex-direction: row;">
                    <li class="navbar-brand">eShop</li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#" style="margin-right:10px">Catalogue</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" href="#">Cart</a>
                    </li>
                </ul>
                <button class="btn btn-outline-success" type="button" @click="$root.showCart = !$root.showCart" style="position:relative">Cart</button>
                <slot></slot>
            </div>
        </div>
    </nav>
    `,
    // <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" @input="onSearch($event.target.value)">
    data() {
        return {
        }
    },
    methods: {
        onSearch(value) {
            let regExp = new RegExp(value, 'gi');

            console.log('search started:' + value);
            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(product => regExp.test(product.product_name));
        },
    }
});