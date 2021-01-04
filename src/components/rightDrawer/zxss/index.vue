<template>
	<div>
		<div class="margin-top-m cardMain" >
			<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" v-for="(item,index) in 5">
				<div class="leftMain" :class="buttonIndex===index?'activeRow':''" @click="rowClick(index,item)">
					<div class="item flex-col align-center">
						<i class="al-icon-xiangmuguanli text-light"></i>
						<span>阳蓄抽{{index}}</span>
					</div>
		
				</div>
		
			</el-col>
		</div>
	</div>
	
</template>

<script>
export default {
  name: "zxss",
  props: {},
  data() {
    return {
      dialogTitle: "", //弹出框标题
      dialogForm: "", //弹出框表单
      showFlag: false, //弹出框显隐状态
      dialogType: 1, //弹出框操作类型
	   buttonIndex:''
    };
  },
  components: {
  },
  created() {},
  mounted() {},
  methods: {
    closeDialog() {
      //关闭弹出框
    },
    showStudescode(data) {
      //监听弹出框是关还是闭
    },
	rowClick(index,data){
		
	},
  },
};
</script>

<style lang="scss" scoped>
.item {
  [class*="icon"] {
    font-size: 36px;
  }
}
</style>

