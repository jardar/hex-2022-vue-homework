const { createApp } = Vue;
import hex from "../utils/hex-api.js";
import ProductDlg from "../component/product-dlg.js";

const { defineRule, Form, Field, ErrorMessage, configure } = VeeValidate;
const { required, email, min, digits } = VeeValidateRules;
const { localize, loadLocaleFromURL } = VeeValidateI18n;

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("digits", digits);

defineRule("cellphone", (value) => {
  if (!value || !value.length) {
    return "台灣手機號必填";
  }

  const res = value.match(/^(09)[0-9]{8}$/) ? true : false;
  if (!res) {
    return "格式錯誤。台灣手機號 09xxxxxxxx";
  }
  return true;
});

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  generateMessage: localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

// console.log("start");

const app = createApp({
  data() {
    return {
      products: [],
      isLoading: "",
      isAddLoading: "",
      isDelLoading: "",
      showLoading: false,
      cart: {
        carts: [],
      },
      order: {},
    };
  },
  components: {
    ProductDlg,
  },
  methods: {
    onSubmit(values) {
      // console.log(`onSubmit:`, values);
      // console.log(`onSubmit:${this.order}`);
      alert(JSON.stringify(values, null, 2));
    },
    handleMore(productId) {
      // console.log("handleMore:", productId);
      this.isLoading = productId;
      axios
        .get(hex.epAProductById(productId))
        .then((res) => {
          console.log(res.data.product);
          this.$refs.productDlg.show(res.data.product);
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.isLoading = "";
        });
    },
    handleAddToCart(productId, qty = 1) {
      // if already in cart
      this.isAddLoading = productId;
      const found = this.cart.carts.find(
        (item) => item.product_id === productId
      );
      if (!found) {
        axios
          .post(hex.epAddToCart, {
            data: {
              product_id: productId,
              qty: qty,
            },
          })
          .then((res) => {
            console.log(res.data.data);
            alert("加入購物車成功");
            this.doGetCart();
          })
          .catch((err) => {
            alert(`失敗:${err.response.data.message || "error"}`);
          })
          .finally(() => {
            this.$refs.productDlg.hide();
            this.isAddLoading = "";
          });
      } else {
        this.handleQtyChange(found.id, productId, found.qty + qty);
      }
    },
    handleQtyChange(cartId, productId, qty) {
      // 防止因 loading 而重新 render cart list 中的數量。
      const found = this.cart.carts.find((item) => item.id === cartId);
      found.qty = qty;

      this.showLoading = true;
      axios
        .put(hex.epUpdateCart(cartId), {
          data: {
            product_id: productId,
            qty: parseInt(qty),
          },
        })
        .then((res) => {
          console.log(res.data.data);
          alert("數量更改成功");
          this.doGetCart();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.$refs.productDlg.hide();
          this.isAddLoading = "";
          this.showLoading = false;
        });
    },
    handleDelCart(cartId) {
      this.isDelLoading = cartId;
      axios
        .delete(hex.epDeleteACart(cartId))
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          this.doGetCart();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.isDelLoading = "";
        });
    },
    handleClearAllCart(cartId) {
      this.showLoading = true;
      axios
        .delete(hex.epDeleteCarts)
        .then((res) => {
          console.log(res.data);
          alert(res.data.message);
          this.doGetCart();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {
          this.showLoading = false;
        });
    },
    doGetCart() {
      axios
        .get(hex.epGetCarts)
        .then((res) => {
          // console.log(res.data.data);
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message || "error"}`);
        })
        .finally(() => {});
    },
  },
  mounted() {
    axios
      .get(`${hex.epAllProducts}`)
      .then((res) => {
        // console.log(res.data.products);
        this.products = res.data.products;
        this.doGetCart();
      })
      .catch((err) => {
        alert(`失敗:${err.response.data.message || "error"}`);
      })
      .finally(() => {});
  },
});

app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.component("loading", VueLoading.Component);

app.mount("#app");
