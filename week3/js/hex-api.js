const apiBase = "https://vue3-course-api.hexschool.io";

const aProduct = `${apiBase}/v2/api/jardar/admin/product`;
const products = `${apiBase}/v2/api/jardar/admin/products`;

export default {
  epLogin: `${apiBase}/v2/admin/signin`,
  epUserCheck: `${apiBase}/v2/api/user/check`,
  epAdmAllProducts: `${products}/all`,
  epAdmGetProductsByCatPage: products,
  epAdmCreateProduct: aProduct,
  epAdmUpdateProduct: aProduct,
  epAdmDeleteProducts: aProduct,
};
