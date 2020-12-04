<template>
  <el-dialog
    title="文件上传"
    :visible.sync="dialogVisible"
    append-to-body
    width="20vw"
  >
    <div class="align-center">
      <el-input placeholder="请输入文件名称" v-model="fileName"></el-input>
      <el-select v-model="currentType" placeholder="选择文件类型">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-upload
        class="upload"
        action="https://jsonplaceholder.typicode.com/posts/"
        :http-request="upload"
        :limit="1"
        :show-file-list="false"
      >
        <i class="el-icon-upload"></i>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script>
import { GetCreateDocId, GetUploadFileType, UploadDocFile } from "@/api";
export default {
  name: "upload",
  props: {
    folderid: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    dialogVisible: {
      handler(newVal) {
        newVal && this.getTypeList();
      },
      immediate: true,
    },
  },
  data() {
    return {
      dialogVisible: false,
      fileName: "",
      typeList: [],
      currentType: "",
    };
  },
  methods: {
    async getTypeList() {
      this.typeList = await GetUploadFileType();
    },
    async upload(file) {
      !this.fileName && this.$message.error("请先添加文件名称");
      !this.currentType && this.$message.error("请先选择文件类型");
      console.log(file);
      const res = await GetCreateDocId({
        folderid: this.folderid,
        tempdefno: this.currentType,
        docname:this.fileName
      });
      await UploadDocFile({itemno:res[0].docno,file:file.file})
    },
  },
};
</script>

<style lang="scss" scoped>
.el-icon-upload {
  font-size: 36px;
  margin-left: 10px;
}
</style>