<template>
  <el-dialog
    title="上传"
    append-to-body
    :visible.sync="dialogVisible"
    v-if="dialogVisible"
    width="30%"
    :before-close="handleClose"
  >
    <el-upload
      ref="upload"
      class="upload"
      drag
      :action="uploadUrl"
      :headers="headers"
      :before-upload="beforeUpload"
      :on-success="onSuccess"
      :multiple="docId===0"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或点击上传</div>
    </el-upload>
  </el-dialog>
</template>

<script>
import { GetUploadFileType, CreateDoc, GetUpdateDocId } from "@/api";
import { getToken } from "@/utils/cookie";
export default {
  props: {
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      add:false,
      docId:0,
      dialogVisible: false,
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
    async beforeUpload(file) {
      console.log(file);
      let itemno;
      try {
        if (this.add) {
          itemno = await this.create(file);
        } else {
          itemno = await this.update(file);
        }
        this.uploadUrl = `http://aglostech1.yicp.io:9080/Document/UploadDocFile?itemno=${itemno}`;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    getType(type){
      if(/officedocument/i.test(type)){
        return 1
      }else if(/image/i.test(type)){
        return 2
      }
    },
    // 创建
    async create(file) {
      const res = await CreateDoc({
        ProjectNo:this.$store.getters.projectNo,
        id: this.id,
        tempdefno: this.getType(file.type),
        docname: file.name
      });
      return res[0].docno;
    },
    // 更新
    async update(file) {
      const res = await GetUpdateDocId({
        docid: this.docId,
        tempdefno: this.getType(file.type),
        docname: file.name
      });
      return res[0].docno;
    },
    onSuccess() {
      this.$refs.upload.clearFiles();
      this.$emit('update',1,true)
      this.dialogVisible = false;
    },
    handleClose(done) {
      done();
    }
  }
};
</script>

<style lang="scss" scoped>
::v-deep .el-upload{
  width: 100%;
}
::v-deep .el-upload-dragger {
  width: 100%;
  background: transparent;
  margin: 0;
}
</style>