<template>
  <el-popover placement="top-start" :title="title" width="300" trigger="hover" :content="info">
    <div slot="reference">
      <slot>
        <span class="text">{{info}}</span>
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
}
</style>
