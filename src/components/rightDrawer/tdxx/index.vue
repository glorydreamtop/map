<template>
	<div>
		<div class="margin-top-m cardMain">
			<el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="6" v-for="(item,index) in tableData">
				<div class="leftMain" :class="buttonIndex===index?'activeRow':''" @click="rowClick(index,item)">
					<div class="item flex-col align-center">
						<i class="al-icon-zhuanyexiangmu text-light"></i>
						<span>UNAME</span>
					</div>

				</div>

			</el-col>
			<p class="margin-top-m  text-center" v-if="tableData.length==0">暂无数据</p>
		</div>
		<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
		 class="newStyleDialog " custom-class="td_add_dialog">
			<tdAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></tdAdd>
		</el-dialog>

	</div>

</template>

<script>
	import tdAdd from '@/components/td/td_fly_add' //城市集镇基本情况调查表
	import {
		GetParcelById
	} from '@/api';
	export default {
		name: "hxx",
		components: {tdAdd},
		props: {},
		data() {
			return {
				dialogTitle: "", //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: 1, //弹出框操作类型
				buttonIndex: '',
				tableData: [],
			};
		},
		
		created() {
			console.log('地块123')
			this.$eventBus.$on("ParcelId", params => {
				console.log(params);
				this.Init(params);

			});
		},
		mounted() {

		},
		methods: {
			Init(params) {
				this.tableData = [];
				var data = {
					id:params.ParcelId,
				}
				GetParcelById(data).then((res) => {
						console.log(res, '地块')
						this.tableData = res;
					})
					.catch((error) => {
						this.tableData = [];
						console.log(error)
					})
			},
			closeDialog() {
				//关闭弹出框
			},
			showStudescode(data) {
				//监听弹出框是关还是闭
			},
			rowClick(index, data) {
				var self = this;
				this.buttonIndex = index;
				this.dialogForm = data;
				this.dialogTitle = '修改土地信息';
				this.dialogType = 'edit';
				this.showFlag = true;
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
