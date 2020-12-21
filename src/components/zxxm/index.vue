<template>
	<div>
		<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" v-for="item in titleData">
			<div class="leftMain">
				<div class="item flex-col align-center" @click="openDetail(item)">
					<i class="al-icon-xiangmuguanli text-light"></i>
					<span>{{item.name}}</span>
				</div>
			</div>

		</el-col>
		<el-dialog
		  :title="dialogTitle"
		  :append-to-body="true"
		  @close="closeDialog"
		  :visible.sync="showFlag"
		  v-model="showFlag"
		  class="newStyleDialog"
		  custom-class="jbqkTable_dialog"
		>
		  <!-- 动态组件 -->
		  <component
		    :is="dialogIndex"
		    :dialog-type="dialogType"
		    v-on:showStudes="showStudescode"
		    :dialog-form="dialogForm"
		    v-if="showFlag"
		  ></component>
		</el-dialog>
	</div>
</template>

<script>
	import dianliTable from "./dianliPage/dianli_table.vue"; //电力
	import dianxinTable from "./dianxinPage/dianxin_table.vue"; //电器
	import gongluTable from "./gongluPage/gonglu_table.vue"; //公路
	import guangboTable from "./guangboPage/guangbo_table.vue"; //广播电视
	import wenwuTable from "./wenwuPage/wenwu_table.vue"; //文物
	import shuidianTable from "./shuidianPage/shuidian_table.vue"; //水电
	import shuiyunTable from "./shuiyunPage/shuiyun_table.vue"; //水利水运
	import tieluTable from "./tieluPage/tielu_table.vue"; //铁路
	import zongjiaoTable from "./zongjiaoPage/zongjiao_table.vue"; //宗教
	export default {
		name: 'Zxxm',
		props: {},
		components:{dianliTable,dianxinTable,gongluTable,guangboTable,wenwuTable,shuidianTable,shuiyunTable,tieluTable,zongjiaoTable},
		data() {
			return {
				dialogTitle: "", //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				dialogIndex:'',//组件显示索引
				titleData: [{
						name: '电力',
						index: 'dianliTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '电信',
						index: 'dianxinTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '铁路',
						index: 'tieluTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '公路',
						index: 'gongluTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '水运',
						index: 'shuiyunTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '水利水电',
						index: 'shuidianTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '文物',
						index: 'wenwuTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '广播电视',
						index: 'guangboTable',
						icon: 'al-icon-xiangmuguanli'
					},
					{
						name: '农村文教',
						index: 'zongjiaoTable',
						icon: 'al-icon-xiangmuguanli'
					},
				],
			}
		},
		created() {},
		mounted() {},
		methods: {
			openDetail(data){
				this.dialogTitle = `${data.name}调查表 `;
				this.showFlag = true;
				this.dialogForm = "";
				this.dialogType = 'table';
				this.dialogIndex=data.index;
			},
			closeDialog() {
			  //关闭弹出框
			},
			showStudescode(data) {
			  //监听弹出框是关还是闭
			},
		}
	}
</script>

<style lang="scss" scoped>
	.item {
		[class*="icon"] {
			font-size: 36px;
			cursor: pointer;
		}
	}
	.leftMain{
		// padding: 1vh 0;
	}
</style>
