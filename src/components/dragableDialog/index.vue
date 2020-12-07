<script>
import Dialog from "element-ui/packages/dialog/src/component.vue";
export default {
  extends: Dialog,
  name: "ElDialog",
  props: {},
  data() {
    return {};
  },
  mounted() { 
    const el = this.$el;
    const dialogHeaderEl = el.querySelector(".el-dialog__header");
    const dragDom = el.querySelector(".el-dialog");
    dialogHeaderEl.style.cursor = "move";

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const style = dragDom.currentStyle || window.getComputedStyle(dragDom, null);

    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX;
      const disY = e.clientY;
      let start = style.transform.substring(6).split(",")
      let startX = parseFloat(start[4]);
      let startY = parseFloat(start[5]);
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        const l = e.clientX - disX;
        const t = e.clientY - disY;
        dragDom.style.transform = `translate(${l + startX}px,${t + startY}px)`;
      };

      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
};
</script>
