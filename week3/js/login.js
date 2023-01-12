import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import hex from "./hex-api.js";

createApp({
  data() {
    return {
      email: "jardar.tsai@gmail.com",
      pass: "jEifD7NF",
      // email: "",
      // pass: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.email == "" || this.pass == "") {
        alert("請輸入帳密");
      }
      axios
        .post(`${hex.epLogin}`, {
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
