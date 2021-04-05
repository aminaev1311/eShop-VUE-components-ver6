Vue.component('search', {
  template: `
        <input class="form-control me-2" type="text" placeholder="Search" aria-label="Search" @input="onSearch($event.target.value)">
    `,

  methods: {
    onSearch(value) {
      let regExp = new RegExp(value, 'gi')
      console.log('search started:' + value)

      this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter((product) =>
        regExp.test(product.product_name)
      )
    },
  },
})

const BASE_URL = 'https://raw.githubusercontent.com/aminaev1311/online-store-api/master/responses/'

const app = new Vue({
  el: '#app',
  data: {
    products: [],
    filtered: [],
    cartProducts: [],
    cart: [],
  },
  methods: {
    async http(url, method = null, body = null) {
      try {
        const response = await fetch(`${url}`, {
          method: method || 'GET',
          /*     headers: {
            'Content-Type': 'application/json',
          }, */
          body: body ? JSON.stringify(body) : null,
        })
        const data = await response.json()
        return data
      } catch (e) {
        console.log(e)
        return false
      }
    },

    onSearch(value) {
      let regExp = new RegExp(value, 'gi')
      console.log('search started:' + value)
      // this.$refs.products.filtered = this.$refs.products.products.filter(product => regExp.test(product.product_name));

      this.filtered = this.products.filter((product) =>
        regExp.test(product.product_name)
      )
    },
  },

  async mounted() {
    const catalog = await this.http(`${BASE_URL}catalogData.json`)
    this.products = this.filtered = [...catalog].map(prod=>({...prod,src: 'https://picsum.photos/130/228?random=' + Math.random() * 1000 }))
    const { contents } = await this.http(`${BASE_URL}getBasket.json`)
    this.cartProducts = [...contents].map(prod=>({...prod,src: 'https://picsum.photos/130/228?random=' + Math.random() * 1000 }))
  },
})
