<script>
import Pagination from "element-ui/packages/pagination/src/pagination.js";
export default {
  extends: Pagination,
  name: "ElPagination",
  props: {
    pageSize: {
      type: Number,
      default: 5
    },
    small: { type: Boolean, default: true },
    layout: {
      default: 'prev, pager, next, total'
    },
  }
};
</script>
