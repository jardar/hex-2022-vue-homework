import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
const apiBase = "https://vue3-course-api.hexschool.io";
const epLogin = "/v2/admin/signin";
createApp({
  data() {
    return {
      email: "jardar.tsai@gmail.com",
      pass: "jEifD7NF",
    };
  },
  methods: {
    handleLogin() {
      if (this.email == "" || this.pass == "") {
        alert("請輸入帳密");
      }
      axios
        .post(`${apiBase}${epLogin}`, {
          username: this.email,
          password: this.pass,
        })
        .then((res) => {
          console.log(res.data);
          document.cookie = `myToken=${res.data.token}; expires=${new Date(
            res.data.expires
          )};`;
          window.location.href = "adm-products.html";
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
}).mount("#app");
