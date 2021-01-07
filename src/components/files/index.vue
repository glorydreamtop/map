<template>
  <div>
    <div class="align-center margin-bottom-m">
      <el-button title="上传" size="small" class="el-icon-upload" @click="upload(true)" />
      <el-button title="修改" size="small" class="el-icon-edit" @click="upload(false)" />
      <el-button title="删除" size="small" class="el-icon-delete"  @click="del" />
    </div>
    <div class="justify-start list" v-infinite-scroll="getList">
      <div :class="['flex-col align-center justify-between item',docId===item.no?'selected':'']" v-for="item in list" :key="item.no" @click="docId=item.no">
        <img v-if="item.type==='img'" :src="item.url" alt="图片预览" class="pic" />
        <i v-else class="al-icon-canyushixiang text-light"></i>
        <span class="name">{{item.name}}</span>
      </div>
    </div>
    <upload ref="upload" :id="id" @update="getList" />
  </div>
</template>

<script>
import { GetDocs, GetDocumentByDocNo, DelDoc } from "@/api";
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
      list: [],
      docId:0,
      currentPage:1
    };
  },
  components: { upload },
  mounted(){
    this.getList()
  },
  methods: {
    async getList(CurrentPage = this.currentPage,update) {
      const { list, total } = await GetDocs({
        CurrentPage,
        PageSize: 10,
        id: this.id
      });
      this.currentPage++;
      const plist = [];
      for (let i = 0; i < list.length; i++) {
        const element = list[i];
        plist.push(new Promise(async(resolve,reject)=>{
          const res = await GetDocumentByDocNo({ docid: element.no })
          resolve({url:res[0].url,no:element.no})
        }));
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
        let a = element.value.url;
        const name = a.split("/")[2];
        return {
          name,
          no:element.value.no,
          type: getType(name),
          url: `http://aglostech1.yicp.io:9080/${a}`
        };
      });
      this.list = update?resList:this.list.concat(resList);
      this.total = total;
    },
    upload(add) {
      this.$refs.upload.dialogVisible = true;
      this.$refs.upload.add = add;
      if(!add){
        this.$refs.upload.docId = this.docId
      }
    },
    async del(){
      if(this.docId===0){
        this.$message.error('请选择一个文件')
        return
      }
      try {
        await DelDoc({docid:this.docId})
        this.$message.success('删除成功')
        this.list=[]
        this.getList(1)
      } catch (error) {
        this.$message.error(error)
      }
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
  font-size: 36px;
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
.item:hover,.selected {
  background: $light;
  .al-icon-canyushixiang {
    color: $white;
  }
}
</style>
