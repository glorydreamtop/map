<template>
  <el-dialog title="文件上传" :visible.sync="dialogVisible" append-to-body width="20vw">
    <div class="align-center">
      <el-select v-model="currentType" placeholder="选择文件类型">
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-upload
        ref="upload"
        class="upload"
        :before-upload="beforeUpload"
        :action="uploadUrl"
        :limit="1"
        name="upFiles_1"
        :headers="headers"
        :show-file-list="false"
        :on-success="onSuccess"
      >
        <i class="el-icon-upload"></i>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script>
import {
  GetCreateDocId,
  GetUploadFileType,
  UploadDocFile,
  GetUpdateDocId
} from "@/api";
import { getToken } from "@/utils/cookie";
export default {
  name: "upload",
  props: {
    folderid: {
      type: Number,
      default: 0
    },
    updateFileId: {
      type: Number,
      default: 0
    }
  },
  watch: {
    dialogVisible: {
      handler(newVal) {
        newVal && this.getTypeList();
      },
      immediate: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      fileName: "",
      typeList: [],
      currentType: "",
      uploadUrl: ""
    };
  },
  computed: {
    headers() {
      return { token: getToken() };
    }
  },
  methods: {
    async getTypeList() {
      this.typeList = await GetUploadFileType();
    },
    async beforeUpload(file) {
      let itemno;
      try {
        if (this.updateFileId > 0) {
          itemno = await this.update(file);
        } else {
          itemno = await this.create(file);
        }
        this.uploadUrl = `${appConfig.baseIp}/Document/UploadDocFile?itemno=${itemno}`;
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    // 创建
    async create(file) {
      !this.currentType && this.$message.error("请先选择文件类型");
      const res = await GetCreateDocId({
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
      this.dialogVisible = false;
      this.$refs.upload.clearFiles();
      this.$emit("update");
    }
  }
};
</script>

<style lang="scss" scoped>
.el-icon-upload {
  font-size: 36px;
  margin-left: 10px;
}
</style>