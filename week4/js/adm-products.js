import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import hex from "./hex-api.js";
import PageComp from "./pagination.js";
import ProductDlg from "./product-dlg.js";
import DeleteDlg from "./delete-dlg.js";

let editModal;
let deleteModal;

const app = createApp({
  data() {
    return {
      items: [],
      selectedItem: {},
      page: {},
      showDelDlg: false,
    };
  },
  methods: {
    resetSelected() {
      this.selectedItem = {
        imagesUrl: [],
      };
    },
    showCreateModal() {
      // // console.log(item);
      // console.log(editModal);
      this.resetSelected();
      editModal.show();
    },
    showDeleteModal(item) {
      // // console.log(item);
      this.selectedItem = { ...item };
      // deleteModal.show();
      this.showDelDlg = true;
    },
    showUpdateModal(item) {
      // // console.log(item);
      this.selectedItem = { ...item };
      editModal.show();
    },
    handleEditOrCreate({ isNew, data }) {
      // console.log(isNew, data);
      if (!isNew) {
        axios
          .put(`${hex.epAdmUpdateProduct}/${this.selectedItem.id}`, {
            data: data,
          })
          .then((res) => {
            alert(`${res.data.message}`);
            // this.doGetAdminAllProducts();
            this.doGetAdminProductsByPage(this.page.current_page);
          })
          .catch((err) => {
            alert(`失敗:${err.response.data.message || "error"}`);
          })
          .finally(() => {
            this.resetSelected();
            editModal.hide();
          });
      } else {
        axios
          .post(`${hex.epAdmCreateProduct}`, {
            data: data,
          })
          .then((res) => {
            alert(`${res.data.message}`);
            // this.doGetAdminAllProducts();
            this.doGetAdminProductsByPage(this.page.current_page);
          })
          .catch((err) => {
            alert(`失敗:${err.response.data.message || "error"}`);
          })
          .finally(() => {
            this.resetSelected();
            editModal.hide();
          });
      }
    },
    handleDelete(doOrNot = false) {
      // // console.log(this.selectedItem);
      this.showDelDlg = false;
      if (doOrNot) {
        axios
          .delete(`${hex.epAdmDeleteProducts}/${this.selectedItem.id}`)
          .then((res) => {
            alert(`${res.data.message}`);
            this.doGetAdminProductsByPage();
          })
          .catch((err) => {
            alert(`失敗:${err.response.data.message || "error"}`);
          })
          .finally(() => {
            this.resetSelected();
            // deleteModal.hide();
          });
      }
    },
    handlePageChange(pageIdx) {
      // console.log(pageIdx);
      if (this.page.current_page === pageIdx) {
        return;
      }
      this.doGetAdminProductsByPage(pageIdx);
    },
    doGetAdminAllProducts() {
      axios
        .get(`${hex.epAdmAllProducts}`)
        .then((res) => {
          // // console.log(res.data);
          const products = res.data.products;
          this.items = products ? Object.values(products) : [];
        })
        .catch((err) => {
          // // console.log(err);
          alert(err.response.data.message || "error");
        });
    },
    doGetAdminProductsByPage(pageNum = 1) {
      axios
        .get(`${hex.epAdmGetProductsByCatPage}?page=${pageNum}`)
        .then((res) => {
          // console.log(res.data);
          this.page = res.data.pagination;
          const products = res.data.products;
          this.items = products ? Object.values(products) : [];
        })
        .catch((err) => {
          // // console.log(err);
          alert(err.response.data.message || "error");
        });
    },
    doCheckUser() {
      axios
        .post(`${hex.epUserCheck}`)
        .then((res) => {
          // // console.log(res.data);
          // this.doGetAdminAllProducts();
          this.doGetAdminProductsByPage();
        })
        .catch((err) => {
          alert(err.response.data.message || "error");
          window.location.href = "login.html";
        });
    },
  },
  mounted() {
    // ref modals
    editModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: false,
    });
    // deleteModal = new bootstrap.Modal(this.$refs.delProductModal, {
    //   keyboard: false,
    // });

    // # 取出 cookie 中的 token，並塞入 api 的 header
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)myToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;
    this.doCheckUser();
  },
});

app.component("PageComp", PageComp);
app.component("ProductDlg", ProductDlg);
app.component("DeleteDlg", DeleteDlg);

app.mount("#app");
