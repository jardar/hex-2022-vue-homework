const apiBase = "https://vue3-course-api.hexschool.io";

const aProduct = `${apiBase}/v2/api/jardar/product`;
const products = `${apiBase}/v2/api/jardar/products`;
const theCart = `${apiBase}/v2/api/jardar/cart`;
const carts = `${apiBase}/v2/api/jardar/carts`;
const aOrder = `${apiBase}/v2/api/jardar/order`;

export default {
  epAllProducts: `${products}/all`,
  epAProductById: (id) => `${aProduct}/${id}`,
  // cart
  epAddToCart: `${theCart}`,
  epGetCarts: `${theCart}`,
  epUpdateCart: (id) => `${theCart}/${id}`,
  epDeleteCarts: `${carts}`,
  epDeleteACart: (id) => `${theCart}/${id}`,
  // order
  epCreateOrder: `${aOrder}`,
};
