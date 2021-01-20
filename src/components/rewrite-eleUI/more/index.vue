<template>
  <el-popover placement="top-start" :title="title" trigger="click">
    <div class="content">{{info}}</div>
    <div slot="reference">
      <slot>
        <div class="text">{{info}}</div>
      </slot>
    </div>
  </el-popover>
</template>

<script>
export default {
  name: "More",
  props: {
    info: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 6em;
  height: 20px;
  line-height: 20px;
}
.content {
  max-width: 200px;
}
</style>
