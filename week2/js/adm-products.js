import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const apiBase = "https://vue3-course-api.hexschool.io";
const epUserCheck = "/v2/api/user/check";
const epAdmAllProducts = "/v2/api/jardar/admin/products/all";

createApp({
  data() {
    return {
      items: [],
      selectedItem: null,
    };
  },
  methods: {
    handleViewProd(item) {
      console.log(item);
      this.selectedItem = item;
    },
    doGetAdminAllProducts() {
      axios
        .get(`${apiBase}${epAdmAllProducts}`)
        .then((res) => {
          console.log(res.data);
          const products = res.data.products;
          this.items = products ? Object.values(products) : [];
        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.message);
        });
    },
    doCheckUser() {
      axios
        .post(`${apiBase}${epUserCheck}`)
        .then((res) => {
          console.log(res.data);
          this.doGetAdminAllProducts();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location.href = "login.html";
        });
    },
  },
  created() {
    // # 取出 cookie 中的 token，並塞入 api 的 header
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.doCheckUser();
  },
}).mount("#app");
