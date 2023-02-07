# 六角 2022 Vue 直播班 主線任務

## week 2

需求：

- 使用者可以從登入頁面登入，並轉到後台商品頁面
- 使用者若無登入直接進入商品頁面，會被導回登入頁面
- 使用者可以查看產品列表
- 使用者可以點擊單一產品，查看詳細資訊

作業等級表

- LV1：參考程式碼範例，並重新撰寫及補上註解（禁止複製範例程式碼）
- LV2：僅使用課程版型，並重新撰寫產品列表的功能
- LV3：不使用課程版型完成此功能

## week 4

作業等級表
LV1：建立分頁元件
LV2：建立分頁及 Modal 元件
LV3：完成 LV2 ＋串接圖片上傳 API 功能以及新增一個自訂欄位，例如：商品評價星級。

## week 5

主線任務
使用 VeeValidate (https://vee-validate.logaretm.com/v4/)套件完成表單驗證功能，操作文件(https://hackmd.io/FFv0a5cBToOATP7uI5COMQ)（無 ESM 版本）
使用 loading 套件(https://www.npmjs.com/package/vue-loading-overlay)製作 loading 效果
串接前台 API 完成購物車功能

注意：
新增相同產品到購物車時需累加項目
送出訂單後，購物車需要清除原本項目
購物車無產品時不建議發出結帳請求
前台頁面表單驗證（必要完成），驗證內容包含：

姓名：必填
Email：必填 / 需要符合格式 / input type 為 email
電話：必填 / 超過 8 碼 / input type 為 tel
地址：必填
留言：非必填

課程 API 相關網址：

註冊連結、測試管理平台
API 文件

前台購物流程 API：

<ul><li><a href="https://codepen.io/hexschool/pen/NWpBXZy" rel="noopener noreferrer" target="_blank">頁面模板</a></li><li><a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%94%A2%E5%93%81%20(Products)/get_v2_api__api_path__products" rel="noopener noreferrer" target="_blank">產品列表</a></li><li><a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%94%A2%E5%93%81%20(Products)/get_v2_api__api_path__product__id_" rel="noopener noreferrer" target="_blank">單一產品細節</a></li><li><a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/post_v2_api__api_path__cart" rel="noopener noreferrer" target="_blank">加入購物車</a> </li><li><a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/get_v2_api__api_path__cart" rel="noopener noreferrer" target="_blank">購物車列表</a></li><li>刪除購物車項目（<a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/delete_v2_api__api_path__cart__id_" rel="noopener noreferrer" target="_blank">單一</a>、<a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/delete_v2_api__api_path__carts" rel="noopener noreferrer" target="_blank">全部</a>）</li><li><a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E8%B3%BC%E7%89%A9%E8%BB%8A%20(Cart)/put_v2_api__api_path__cart__id_" rel="noopener noreferrer" target="_blank">調整購物車產品數量 </a></li><li><a href="https://hexschool.github.io/vue3-courses-swaggerDoc/#/%E5%AE%A2%E6%88%B6%E8%B3%BC%E7%89%A9%20-%20%E7%B5%90%E5%B8%B3%20(Order)/post_v2_api__api_path__order" rel="noopener noreferrer" target="_blank">結帳付款</a></li></ul>

頁面模板
產品列表
單一產品細節
加入購物車
購物車列表
刪除購物車項目（單一、全部）
調整購物車產品數量
結帳付款

---

每週的範例 github-pages：https://hexschool.github.io/live-vue3-training-chapter-works/

GitHub Repo：https://github.com/hexschool/live-vue3-training-chapter-works

⭐️ 範例檔案中的 API Path 請換成自己的唷！

（範例使用教學）https://hackmd.io/1OSNS4AtRQ2-j-WrbrOgyg
