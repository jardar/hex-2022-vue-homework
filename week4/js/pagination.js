export default {
  template: `<nav aria-label="Page navigation">
  <ul class="pagination">
    <li :class="{'disabled': !page.has_pre}" class="page-item">
      <a @click="handleChange(page.current_page-1)" class="page-link" href="#">上頁</a>
    </li>
    <li v-for="p in page.total_pages"  :class="{'active':page.current_page===p}" class="page-item"><a @click="handleChange(p)" class="page-link" href="#">{{p}}</a></li>
    
    <li  :class="{'disabled': !page.has_next}" class="page-item">
    <a @click="handleChange(page.current_page+1)" class="page-link" href="#">下頁</a></li>
  </ul>
</nav>`,
  props: ["page"],
  emits: ["change"],
  data() {
    return {};
  },
  methods: {
    handleChange(pageIdx) {
      // console.log(pageIdx);
      this.$emit("change", pageIdx);
    },
  },
};
