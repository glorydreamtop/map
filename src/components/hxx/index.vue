<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="el-icon-plus" @click="addClick()" plain title="添加户信息">  </el-button>
			<div class="margin-top-m">
				<el-cascader placeholder="请搜索户信息" :options="areaOptions" filterable style="width: 100%;"></el-cascader>
			</div>
			<div class="margin-top-m">
				<el-input v-model="search" placeholder="请搜索户信息"  prefix-icon="el-icon-search"></el-input>
				<!-- <el-cascader placeholder="请搜索户信息" :options="areaOptions" filterable style="width: 100%;"></el-cascader> -->
			</div>
			<div class="margin-top-m">
				<el-table :data="tableData" style="width: 100%" border @row-click="rowClick">
					<el-table-column label="户编号" prop="code" align="center"></el-table-column>
					<el-table-column label="户名称" prop="name" align="center"> </el-table-column>
					<!-- <el-table-column align="center">
						<template slot="header" slot-scope="scope">
							<el-input v-model="search" size="mini" placeholder="输入户名称搜索" />
						</template>
						<template slot-scope="scope">
							<el-button title="查看" icon="el-icon-view" type="primary" plain @click="lookClick(scope.row)"></el-button>
						</template>
					</el-table-column> -->
				</el-table>
			</div>
		</div>
		<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
		 class="newStyleDialog " custom-class="hxx_add_dialog">
			<hxxAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></hxxAdd>
		</el-dialog>
	</div>
</template>

<script>
	import hxxAdd from '@/components/hxx/hxx_fly_add' //城市集镇基本情况调查表
	export default {
		name: 'Hxx',
		props: {},
		components: {
			hxxAdd
		},
		data() {
			return {
				areaOptions: [{
					value: 'zhinan',
					label: '天津市',
					children: [{
						value: 'shejiyuanze',
						label: '蓟州区',
						children: [{
							value: 'yizhi',
							label: '别山镇'
						}, {
							value: 'fankui',
							label: '下营镇'
						}, {
							value: 'xiaolv',
							label: '上仓镇'
						}, {
							value: 'kekong',
							label: '下仓镇'
						}]
					}, {
						value: 'daohang',
						label: '宝坻区',
						children: [{
							value: 'cexiangdaohang',
							label: '大庄'
						}, {
							value: 'dingbudaohang',
							label: '下庄'
						}]
					}]
				}],
				tableData: [{
						name: '户姓名1',
						code: '001'
					},
					{
						name: '户姓名1',
						code: '001'
					},
					{
						name: '户姓名1',
						code: '001'
					},
				],
				search: '',
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
			}
		},
		created() {},
		mounted() {},
		methods: {
			rowClick(row) { //单元格一行点击
				this.dialogForm = row;
				this.dialogTitle = '户信息详情';
				this.dialogType = 'look';
				this.showFlag = true;
			},
			addClick(){//添加户信息
				this.dialogForm = '';
				this.dialogTitle = '添加户信息';
				this.dialogType = 'add';
				this.showFlag = true;
			},
			closeDialog() { //关闭弹出框
			
			},
			showStudescode(data) { //监听弹出框是关还是闭
			
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>
