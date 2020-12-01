<template>
  <el-dialog
    :visible.sync="visible"
    :close-on-press-escape="false"
    :show-close="false"
    width="240px"
    @close="$emit('update:stageShow',false)"
    center
  >
    <el-radio-group
      v-model="radio"
      @change="change"
      class="box flex-col justify-between margin-left-l"
    >
      <el-radio v-for="item in list" :key="item.o_projectno" :label="item.o_projectno">{{item.o_projectdesc}}</el-radio>
    </el-radio-group>
  </el-dialog>
</template>

<script>
import {GetSubProjects} from '@/api'
export default {
  name: "stageSelector",
  props: {
    stageShow:{
      type:Boolean,
      default:false
    }
  },
  data() {
    return {
      radio:'',
      list:[],
      visible:false
    };
  },
  watch:{
    stageShow:{
      handler(newVal){
        this.visible = newVal
      },
      immediate:true
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      try {
        this.list = await GetSubProjects({parentno:0})
      } catch (error) {
        console.log(error);
        this.$message.error('无法获取阶段信息')
      }
    },
    change(e){
      this.$store.commit('info/SET_PROJECTNO',e)
      let timer = setTimeout(()=>{
        this.$emit('update:stageShow',false)
        timer = null
      },500)
    }
  },
};
</script>

<style lang="scss" scoped>

.box {
  width: 100%;
  height: 180px;
  .el-input {
    width: 60%;
  }
}
</style>
