export default {
  template: "#userProductModal",
  props: ["onAddToCart"],
  data() {
    return {
      myModal: {},
      pid: "",
      product: {},
      qty: 1,
      isLoading: false,
    };
  },
  methods: {
    show(prod) {
      this.isLoading = false;
      this.product = prod;
      this.qty = 1;
      // console.log("dlg", prod);
      this.myModal.show();
    },
    hide() {
      this.myModal.hide();
    },
    handleAdd() {
      this.isLoading = true;
      this.onAddToCart(this.product.id, this.qty);
    },
  },
  mounted() {
    this.myModal = new bootstrap.Modal(this.$refs.productModal, {
      keyboard: true,
    });
    // console.log(this.myModal);
  },
};
