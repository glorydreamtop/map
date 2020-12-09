<template>
	<el-dialog
		:visible.sync="visible"
		:close-on-press-escape="false"
		width="70vw"
		v-loading="loadingtable"
		title="字典设置"
		custom-class="dictionary_dialog"
		@close="$emit('update:showDialog', false)"
		center>
		<el-row :gutter="20">
			<el-col :xs="8" :sm="6" :md="6" :lg="5" :xl="4">
				<div class="treeMain">
					<div class="header_table_title">
						<el-button size="mini" @click="addClick('tree')" icon="el-icon-plus"></el-button>
						<el-button title="修改" @click="editClick('tree')" size="mini" icon="el-icon-edit" plain></el-button>
						<el-button title="删除" @click="delClick('tree')" size="mini" icon="el-icon-delete" plain></el-button>
					</div>
					<div class="body_tree_mian"><el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick" default-expand-all></el-tree></div>
				</div>
			</el-col>
			<el-col :xs="16" :sm="18" :md="18" :lg="19" :xl="20">
				<div class="tableMain">
					<div class="header_table_title">
						<el-button size="mini" @click="addClick('table')" icon="el-icon-plus"></el-button>
						<el-button title="修改" @click="editClick('table')" size="mini" icon="el-icon-edit" plain></el-button>
						<el-button title="删除" @click="delClick('table')" size="mini" icon="el-icon-delete" plain></el-button>
					</div>
					<div class="body_table_mian">
						<el-table
							v-loading="tableLoad"
							element-loading-text="客官请稍后"
							element-loading-spinner="el-icon-loading"
							class="fixTable49"
							element-loading-background="#022333"
							:data="tableData"
							row-key="id"
							:tree-props="{ children: 'children' }"
							border
							style="width: 100%"
							height="50vh">
							<el-table-column prop="SerialNumber" label="项目名称" align="center"></el-table-column>
							<el-table-column prop="Createdate" label="编码" align="center"></el-table-column>
							<el-table-column prop="CountyDESC" label="单位"  align="center"></el-table-column>
							<el-table-column prop="Region" label="描述" align="center"></el-table-column>	
						</el-table>
						<el-pagination
							@size-change="handleSizeChange"
							@current-change="handleCurrentChange"
							:current-page="formeData.CurrentPage"
							:page-sizes="[10, 20, 50, 100]"
							:page-size="formeData.PageSize"
							layout="total, sizes, prev, pager, next, jumper"
							:total="total"
						></el-pagination>
					</div>
				</div>
			</el-col>
			<div>
				<el-dialog
					:title="dialogTitle"
					:append-to-body="true"
					@close="closeDialog"
					:visible.sync="showFlag"
					v-model="showFlag"
					class="newStyleDialog "
					center
					:custom-class="flyType + '_add_dialog'">
					<treeAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag && flyType == 'tree'"></treeAdd>
					<tableAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag && flyType == 'table'"></tableAdd>
				</el-dialog>
			</div>
		</el-row>
	</el-dialog>
</template>

<script>
import { mapGetters } from 'vuex';
import { GetAllBaseTablesBaseAttrs, DeleteBaseTable } from '@/api';
import treeAdd from '@/components/dictionaryPage/dictionary_tree_add';
import tableAdd from '@/components/dictionaryPage/dictionary_table_add';
export default {
	name: 'jbqlTable_home',
	props: {},
	components: {
		treeAdd,
		tableAdd
	},
	computed: {
		...mapGetters(['projectNo', 'BaseType'])
	},
	data() {
		return {
			tableData: [],
			treeData: [],
			dialogTitle: '', //弹出框标题
			dialogForm: '', //弹出框表单
			showFlag: false, //弹出框显隐状态
			visible:true,
			dialogType: '', //弹出框操作类型
			flyType: '',
			total: 0,
			formeData: {
				CurrentPage: 1,
				PageSize: 10
			},
			loadingtable:false,
			tableLoad: false,
			defaultProps: {
				children: 'children',
				label: 'label'
			}
		};
	},
	created() {},
	mounted() {
		this.tableInit(); //表格初始化
		this.treeInit(); //树形初始化
	},
	methods: {
		treeInit() {
			this.treeData = [
				{
					label: '一级 1',
					children: [
						{
							label: '二级 1-1',
							children: [
								{
									label: '三级 1-1-1'
								}
							]
						}
					]
				},
				{
					label: '一级 2',
					children: [
						{
							label: '二级 2-1',
							children: [
								{
									label: '三级 2-1-1'
								}
							]
						},
						{
							label: '二级 2-2',
							children: [
								{
									label: '三级 2-2-1'
								}
							]
						}
					]
				},
				{
					label: '一级 3',
					children: [
						{
							label: '二级 3-1',
							children: [
								{
									label: '三级 3-1-1'
								}
							]
						},
						{
							label: '二级 3-2',
							children: [
								{
									label: '三级 3-2-1'
								}
							]
						}
					]
				}
			];
		},
		tableInit() {
			var data = {
				BaseType: this.BaseType,
				ProjectNo: this.projectNo,
				...this.formeData
			};
			this.tableLoad = true;
			GetAllBaseTablesBaseAttrs(data)
				.then(res => {
					console.log(res);
					this.tableLoad = false;
					this.tableData = res.list;
					this.total = res.total;
				})
				.catch(error => {
					this.tableData = [];
					this.tableLoad = false;
					console.log(error);
				});
		},
		handleNodeClick(data) {
			//点击树形
		},
		handleSizeChange(val) {
			//每页#条
			this.formeData.PageSize = val;
			this.tableInit();
		},
		handleCurrentChange(val) {
			//当前第几页
			this.formeData.CurrentPage = val;
			this.tableInit();
		},
		lookClick(type) {
			//查看
			this.flyType = type;
			this.dialogForm = '';
			this.dialogTitle = '查看' + (type == 'tree' ? '项目树' : '数据项');
			this.dialogType = type + 'look';
			this.showFlag = true;
		},
		delClick() {
			var self = this;
			this.$confirm('此操作将永久删除, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				center: true,
				type: 'warning'
			})
				.then(() => {
					DeleteBaseTable({
						id: row.KeyNo
					})
						.then(res => {
							console.log(res);
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});

							self.tableInit();
						})
						.catch(res => {
							console.log(res);
						});
				})
				.catch(res => {});
		},
		editClick(type) {
			//修改
			this.flyType = type;
			this.dialogForm = '';
			this.dialogTitle = '修改' + (type == 'tree' ? '项目树' : '数据项');
			this.dialogType = type + 'edit';
			this.showFlag = true;
		},
		addClick(type) {
			//添加
			this.flyType = type;
			this.dialogForm = '';
			this.dialogTitle = '添加' + (type == 'tree' ? '项目树' : '数据项');
			this.dialogType = type + 'add';
			this.showFlag = true;
		},
		closeDialog() {
			//关闭弹出框
			this.tableInit();
		},
		showStudescode(data) {
			//监听弹出框是关还是闭
		}
	}
};
</script>

<style scoped="scoped">
.tableMain {
	width: 100%;
	height: 50vh;
}

.body_tree_mian{
	margin-top: 1vh;
	border: 1px solid;
	height: 50vh;
}
.body_table_mian {
	margin-top: 1vh;
}
</style>
