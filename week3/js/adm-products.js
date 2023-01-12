import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import hex from "./hex-api.js";

let editModal;
let deleteModal;

createApp({
  data() {
    return {
      items: [],
      selectedItem: {},
    };
  },
  methods: {
    resetSelected() {
      // this.selectedItem = {
      //   title: "鳳梨",
      //   category: "水果",
      //   unit: "個",
      //   content: "一種原產於南美洲的植物，通常稱為鳳梨、菠蘿或菠蘿果。",
      //   description:
      //     "一種原產於南美洲的植物，通常稱為鳳梨、菠蘿或菠蘿果。它是蕨類植物中的一種，屬於 Bromeliaceae 科。鳳梨是一種棕色的多肉植物，長有青綠色的葉片和鮮黃色的花。其果實通常是圓柱形且有綠色的外觀，味道甜美多汁。鳳梨是一種多用途的水果，常被用於食品工業中做成各種產品，如果汁、果醬、罐頭等。在食用上通常切塊食用或做成冰沙、沙拉、酒等。",
      //   origin_price: 100,
      //   price: 80,
      //   imageUrl:
      //     "https://images.unsplash.com/photo-1550258987-190a2d41a8ba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      //   imagesUrl: [],
      // };
      this.selectedItem = {
        imagesUrl: [],
      };
    },
    showCreateModal() {
      // console.log(item);
      this.resetSelected();
      editModal.show();
    },
    showDeleteModal(item) {
      // console.log(item);
      this.selectedItem = { ...item };
      deleteModal.show();
    },
    showUpdateModal(item) {
      // console.log(item);
      this.selectedItem = { ...item };
      editModal.show();
    },
    handleEditOrCreate() {
      console.log(this.selectedItem);
      if (this.selectedItem?.id) {
        axios
          .put(`${hex.epAdmUpdateProduct}/${this.selectedItem.id}`, {
            data: this.selectedItem,
          })
          .then((res) => {
            alert(`${res.data.message}`);
            this.doGetAdminAllProducts();
          })
          .catch((err) => {
            alert(`失敗:${err.response.data.message}`);
          })
          .finally(() => {
            this.resetSelected();
            editModal.hide();
          });
      } else {
        axios
          .post(`${hex.epAdmCreateProduct}`, {
            data: this.selectedItem,
          })
          .then((res) => {
            alert(`${res.data.message}`);
            this.doGetAdminAllProducts();
          })
          .catch((err) => {
            alert(`失敗:${err.response.data.message}`);
          })
          .finally(() => {
            this.resetSelected();
            editModal.hide();
          });
      }
    },
    handleDelete() {
      console.log(this.selectedItem);
      axios
        .delete(`${hex.epAdmDeleteProducts}/${this.selectedItem.id}`)
        .then((res) => {
          alert(`${res.data.message}`);
          this.doGetAdminAllProducts();
        })
        .catch((err) => {
          alert(`失敗:${err.response.data.message}`);
        })
        .finally(() => {
          this.resetSelected();
          deleteModal.hide();
        });
    },
    doGetAdminAllProducts() {
      axios
        .get(`${hex.epAdmAllProducts}`)
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
        .post(`${hex.epUserCheck}`)
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
  mounted() {
    // ref modals
    editModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false,
    });
    deleteModal = new bootstrap.Modal(this.$refs.delProductModal, {
      keyboard: false,
    });

    // # 取出 cookie 中的 token，並塞入 api 的 header
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.doCheckUser();
  },
}).mount("#app");
