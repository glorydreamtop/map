<template>
  <div>
    <div class="align-center margin-bottom-m">
      <el-button title="上传" size="small" class="el-icon-upload" />
      <el-button title="修改" size="small" class="el-icon-edit" />
      <el-button title="删除" size="small" class="el-icon-delete" />
    </div>
    <div class="justify-start list">
      <div class="flex-col align-center item" v-for="item in list" :key="item.no">
        <i class="al-icon-xiangmuguanli text-light"></i>
        <span>{{item.name}}</span>
      </div>
    </div>
    <upload />
  </div>
</template>

<script>
import {GetDocs} from '@/api'
import upload from "./upload";
export default {
  name: "Files",
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      list: [
        { no: 1, name: "哈哈哈哈哈" },
        { no: 2, name: "方法哈哈哈哈" },
        { no: 3, name: "哈问问哈哈" },
        { no: 4, name: "哈哈哈哈哈" },
        { no: 5, name: "方法哈哈哈哈" },
        { no: 6, name: "哈问问哈哈" },
        { no: 7, name: "哈哈哈哈哈" },
        { no: 8, name: "方法哈哈哈哈" },
        { no: 9, name: "哈问问哈哈" },
        { no: 10, name: "哈哈哈哈哈" },
        { no: 11, name: "方tt哈哈哈哈" },
        { no: 12, name: "哈问问哈哈" }
      ]
    };
  },
  components: { upload },
  mounted() {
    this.getList(1)
  },
  methods: {
    async getList(CurrentPage=1){
      const {list,total} = await GetDocs({CurrentPage,PageSize:10,id:this.id})
      this.list = list;
      this.total = total;
      
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  overflow: auto;
  flex-wrap: wrap;
}
.al-icon-xiangmuguanli {
  font-size: 36px;
}
.item {
  white-space: nowrap;
  margin: 0 50px 30px 0;
}
.item:hover{
  background: $light;
  .al-icon-xiangmuguanli{
    color: $white;
  }
}
</style>
