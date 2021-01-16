<template>
  <div v-loading="loading">
    <div class="align-center margin-bottom-m">
      <el-button title="查看" icon="al-icon-yulan" @click="preview" />
      <el-button title="上传" icon="al-icon-shangchuan" @click="upload(true)" />
      <el-button title="修改" icon="al-icon-xiugai" @click="upload(false)" />
      <el-button title="删除" icon="al-icon-shanchu" @click="del" />
    </div>
    <div class="justify-start list" v-infinite-scroll="getList" :infinite-scroll-immediate="false">
      <div
        :class="['flex-col align-center justify-between item',currentFile.no===item.no?'selected':'']"
        v-for="item in list"
        :key="item.no"
        @click="select(item)"
      >
        <img v-if="item.type==='img'" :src="item.url" alt="图片预览" class="pic" />
        <i v-else class="al-icon-canyushixiang text-light"></i>
        <span class="name">{{item.name}}</span>
      </div>
    </div>
    <upload ref="upload" :id="id" @update="getList" />
  </div>
</template>

<script>
import {
  GetDocs,
  GetDocumentByDocNo,
  GetWordOrExcelToPDF,
  DelDoc
} from "@/api";
import upload from "./upload";
export default {
  name: "Files",
  props: {
    id: {
      type: Number,
      default: 0
    },
    init: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      loading: false,
      list: [],
      currentFile: {
        type: "img",
        no: 0,
        url: ""
      },
      currentPage: 1,
      total: -1
    };
  },
  components: { upload },
  mounted() {
    this.init && this.getList();
  },
  methods: {
    async getList(CurrentPage = this.currentPage, update = false) {
      if (this.list.length <= this.total && !update) return;
      this.loading = true;
      try {
        const { list, total } = await GetDocs({
          CurrentPage,
          PageSize: 10,
          id: this.id
        });
        this.currentPage = this.currentPage + 1;
        const plist = [];
        // 解析文件格式
        const getType = name => {
          const minetype = name.split(".")[1];
          if (["png", "jpg", "jpeg", "webp", "bmp", "gif"].includes(minetype)) {
            return "img";
          } else if (/doc/i.test(minetype)) {
            return "doc";
          } else if (/xls/i.test(minetype)) {
            return "xls";
          } else {
            return "other";
          }
        };
        // 创建promise
        const createP = async element => {
          await GetDocumentByDocNo({ docid: element.no });
          return { url: res[0].url, no: element.no };
        };
        // 创建并发数组
        for (let i = 0; i < list.length; i++) {
          const element = list[i];
          plist.push(createP(element));
        }
        const picList = await Promise.allSettled(plist);
        const resList = picList.map(element => {
          let a = element.value.url;
          const name = decodeURI(a.split("/")[2]);
          return {
            name,
            no: element.value.no,
            type: getType(name),
            url: `${appConfig.baseIp}/${a}`
          };
        });
        this.list = update ? resList : this.list.concat(resList);
        this.total = total;
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    upload(add) {
      this.$refs.upload.dialogVisible = true;
      this.$refs.upload.add = add;
      if (!add) {
        this.$refs.upload.docId = this.currentFile.no;
      }
    },
    async del() {
      if (this.currentFile.no === 0) {
        this.$message.error("请选择一个文件");
        return;
      }
      try {
        await DelDoc({ docid: this.currentFile.no });
        this.$message.success("删除成功");
        this.getList(1, true);
      } catch (error) {
        this.$message.error(error);
      }
    },
    preview() {
      if (this.currentFile.no === 0) {
        this.$message.error("请选择一个文件");
        return;
      }
      this.loading = true;
      const getView = async Type => {
        try {
          const res1 = await GetDocumentByDocNo({ docid: this.currentFile.no });
          const res2 = await GetWordOrExcelToPDF({ Type, Path: res1[0].url });
          window.open(`${appConfig.baseIp}/${res2[0].url}`);
          this.loading = false;
        } catch (error) {
          this.loading = false;
          this.$message.error("文件转换失败");
        }
      };
      switch (this.currentFile.type) {
        case "doc":
          getView("word");
          break;
        case "xls":
          getView("excel");
          break;
        default:
          window.open(this.currentFile.url);
          this.loading = false;
          break;
      }
    },
    select(e) {
      this.currentFile = e;
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  width: 100%;
  height: 320px;
  overflow: auto;
  flex-wrap: wrap;
}
.al-icon-canyushixiang {
  font-size: 56px;
}
.pic {
  max-height: 100px;
}
.name {
  width: 120px;
  height: 26px;
  font-size: 16px;
  line-height: 26px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item {
  white-space: nowrap;
  height: 126px;
  margin: 0 50px 30px 0;
}
.item:hover,
.selected {
  background: $light;
  .al-icon-canyushixiang {
    color: $white;
  }
}
</style>
