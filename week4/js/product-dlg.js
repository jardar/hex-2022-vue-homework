export default {
  props: ["item"],
  emits: ["update"],
  data() {
    return {
      selectedItem: {},
    };
  },
  watch: {
    item() {
      // console.log(this.item);
      this.selectedItem = { ...this.item };
    },
  },
  methods: {
    handleEditOrCreate() {
      this.$emit("update", {
        isNew: !this.selectedItem.id,
        data: this.selectedItem,
      });
    },
  },
  template: `<div class="modal-dialog modal-xl">
    <div    class="modal-content border-0">
      <div class="modal-header bg-dark text-white">
        <h5 id="productModalLabel" class="modal-title">
          <span>{{selectedItem?.id?'編輯':'新增'}}產品</span>          
        </h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-sm-4">
            <div class="mb-2">
              <h3>主要圖片</h3>
              <div class="mb-3">
              
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <input
                  v-model="selectedItem.imageUrl"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結" />
              </div>
              <img
                v-if="selectedItem.imageUrl"
                class="img-fluid"
                :src="selectedItem.imageUrl"
                alt="product image" />
            </div>
            <!-- 主 -->
            <h3>次要圖片</h3>
            <div
              v-for="(img,idx) in selectedItem.imagesUrl"
              :key="idx"
              class="mb-2">
              <div class="mb-3">
                <label for="imageUrl" class="form-label">輸入圖片網址</label>
                <button
                  @click="selectedItem.imagesUrl.splice(idx,1)"
                  type="button"
                  class="btn btn-outline-danger btn-sm ms-2">
                  刪除
                </button>
                <input
                  v-model="selectedItem.imagesUrl[idx]"
                  type="text"
                  class="form-control"
                  placeholder="請輸入圖片連結" />
              </div>
              <img v-if="img" class="img-fluid" :src="img" alt="product image" />
            </div>
  
            <div>
              <button
                @click="selectedItem.imagesUrl?selectedItem.imagesUrl.push(''):selectedItem.imagesUrl=['']"
                class="btn btn-outline-primary btn-sm d-block w-100">
                新增圖片
              </button>
            </div>
          </div>
  
          <div class="col-sm-8">
            <div class="mb-3">
              <label for="title" class="form-label">標題 </label>
              <input
                v-model="selectedItem.title"
                id="title"
                type="text"
                class="form-control"
                placeholder="請輸入標題" />
                
            </div>
  
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="category" class="form-label">分類</label>
                <input
                  v-model="selectedItem.category"
                  id="category"
                  type="text"
                  class="form-control"
                  placeholder="請輸入分類" />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">單位</label>
                <input
                  v-model="selectedItem.unit"
                  id="unit"
                  type="text"
                  class="form-control"
                  placeholder="請輸入單位" />
              </div>
            </div>
  
            <div class="row">
              <div class="mb-3 col-md-6">
                <label for="origin_price" class="form-label">原價</label>
                <input
                  v-model="selectedItem.origin_price"
                  id="origin_price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入原價" />
              </div>
              <div class="mb-3 col-md-6">
                <label for="price" class="form-label">售價</label>
                <input
                  v-model="selectedItem.price"
                  id="price"
                  type="number"
                  min="0"
                  class="form-control"
                  placeholder="請輸入售價" />
              </div>
            </div>
            <hr />
  
            <div class="mb-3">
              <label for="description" class="form-label">產品描述</label>
              <textarea
                v-model="selectedItem.description"
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入產品描述">
              </textarea>
            </div>
            <div class="mb-3">
              <label for="content" class="form-label">說明內容</label>
              <textarea
                v-model="selectedItem.content"
                id="description"
                type="text"
                class="form-control"
                placeholder="請輸入說明內容">
              </textarea>
            </div>
            <div class="mb-3">
              <div class="form-check">
                <input
                  v-model="selectedItem.is_enabled"
                  id="is_enabled"
                  class="form-check-input"
                  type="checkbox"
                  :true-value="1"
                  :false-value="0" />
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-outline-secondary"
          data-bs-dismiss="modal">
          取消
        </button>
        <button @click="handleEditOrCreate" type="button" class="btn btn-primary">
          確認
        </button>
      </div>
    </div>
  </div>`,
};
