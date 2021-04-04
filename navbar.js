Vue.component('nav-bar',{
    template:`
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">eShop</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Catalogue</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" href="#">Cart</a>
                    </li>
                </ul>
                <form class="d-flex">
                    <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" @input="onSearch($event.target.value)">
                    <button class="btn btn-outline-success" type="button">Cart</button>
                </form>
            </div>
        </div>
    </nav>
    `,
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