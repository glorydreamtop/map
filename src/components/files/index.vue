<template>
  <div>
    <div class="align-center margin-bottom-m">
      <el-button title="上传" size="small" class="el-icon-upload" @click="upload" />
      <el-button title="修改" size="small" class="el-icon-edit" />
      <el-button title="删除" size="small" class="el-icon-delete" />
    </div>
    <div class="justify-start list">
      <div class="flex-col align-center justify-between item" v-for="item in list" :key="item.no">
        <img v-if="item.type==='img'" :src="item.url" alt="图片预览" class="pic" />
        <i v-else class="al-icon-canyushixiang text-light"></i>
        <span class="name">{{item.name}}</span>
      </div>
    </div>
    <upload ref="upload" :id="id" @update="getList" />
  </div>
</template>

<script>
import { GetDocs, GetDocumentByDocNo } from "@/api";
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
      list: []
    };
  },
  components: { upload },
  mounted() {
    this.getList(1);
  },
  methods: {
    async getList(CurrentPage = 1) {
      const { list, total } = await GetDocs({
        CurrentPage,
        PageSize: 10,
        id: this.id
      });
      const plist = [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        plist.push(GetDocumentByDocNo({ docid: element.no }));
      }
      const picList = await Promise.allSettled(plist);
      const getType = name => {
        if (
          ["png", "jpg", "jpeg", "webp", "bmp", "gif"].includes(
            name.split(".")[1]
          )
        ) {
          return "img";
        } else {
          return "doc";
        }
      };
      const resList = picList.map(element => {
        console.log(element);
        let a = element.value[0].url;
        const name = a.split("/")[2];
        return {
          name,
          type: getType(name),
          url: `http://aglostech1.yicp.io:9080/${a}`
        };
      });
      this.list = resList;
      this.total = total;
    },
    upload(add) {
      this.$refs.upload.dialogVisible = true;
      this.$refs.upload.add = add;
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
.al-icon-canyushixiang {
  font-size: 36px;
}
.pic {
  max-height: 100px;
}
.name {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item {
  white-space: nowrap;
  margin: 0 50px 30px 0;
}
.item:hover {
  background: $light;
  .al-icon-canyushixiang {
    color: $white;
  }
}
</style>
