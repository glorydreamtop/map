<template>
  <el-dialog
    :visible.sync="showDialog"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
    width="240px"
    title="选择阶段"
    center
  >
    <el-radio-group
      v-model="radio"
      @change="change"
      class="box flex-col justify-between margin-left-l"
    >
      <el-radio v-for="item in list" :class="item.o_projectno === projectNo?'is-checked':''" :key="item.o_projectno" :label="item.o_projectno">{{item.o_projectdesc}}</el-radio>
    </el-radio-group>
  </el-dialog>
</template>

<script>
import {GetSubProjects} from '@/api'
import { mapGetters } from 'vuex';
export default {
  name: "stageSelector",
  props: {
    showDialog:{
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
  computed:{
    ...mapGetters(['projectNo'])
  },
  watch:{
    showDialog:{
      handler(newVal){
        newVal&&this.getList()
      },
      immediate:true
    }
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
        this.$emit('update:showDialog',false)
        timer = null
      },500)
      this.$eventBus.$emit('selectedStage')
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
  .is-checked{
    color: $light;
  }
}
</style>
