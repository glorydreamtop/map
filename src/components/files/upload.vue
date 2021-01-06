<template>
  <el-dialog title="上传" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
    <el-upload
      ref="upload"
      class="upload"
      drag
      :action="uploadUrl"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      multiple
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </el-dialog>
</template>

<script>
import { GetSubTypeTempdefns, CreateDoc, GetUpdateDocId } from "@/api";
export default {
  data() {
    return {
      dialogVisible: false,
      typeList: [],
      uploadUrl: "",
      updateFileId: 0
    };
  },
  computed: {
    headers() {
      return { token: getToken() };
    }
  },
  methods: {
    async getTypeList() {
      this.typeList = await GetSubTypeTempdefns();
    },
    async beforeUpload(file) {
      let itemno;
      try {
        if (this.updateFileId > 0) {
          itemno = await this.update(file);
        } else {
          itemno = await this.create(file);
        }
        this.uploadUrl = `http://aglostech1.yicp.io:9080/Document/UploadDocFile?itemno=${itemno}`;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    // 创建
    async create(file) {
      !this.currentType && this.$message.error("请先选择文件类型");
      const res = await CreateDoc({
        folderid: this.folderid,
        tempdefno: this.currentType,
        docname: file.name
      });
      return res[0].docno;
    },
    // 更新
    async update(file) {
      const res = await GetUpdateDocId({
        docid: this.updateFileId,
        tempdefno: this.currentType,
        docname: file.name
      });
      return res[0].docno;
    },
    onSuccess() {
      this.$refs.upload.clearFiles();
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>