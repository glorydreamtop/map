<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="al-icon-tianjia" @click="addClick()" />
		</div>
		<div class="body_table_mian">
			<el-table v-loading="tableLoad"  :data="tableData" row-key="id" :tree-props="{children: 'children'}" border style="width: 100%" height="50vh">
				<!-- <el-table-column prop="DXBH" label="编号" width="150" align="center"> </el-table-column> -->
				<el-table-column type="index" label="序号" width="100" align="center"> </el-table-column>
				<el-table-column prop="XLMC" label="公路名称" width="150" align="center"> </el-table-column>
				<el-table-column prop="JCSJ" label="建成时间" align="center" width="150"> </el-table-column>
				<el-table-column prop="CountyDESC" label="区县" width="100" align="center"> </el-table-column>
				<el-table-column  label="高程范围" align="center"> 
				   <el-table-column prop="GCFW1" label="范围1" width="100" align="center"> </el-table-column>
				   <el-table-column prop="GCFW2" label="范围2" width="100" align="center"> </el-table-column>
				</el-table-column>
				<el-table-column prop="Region" label="工程类型" align="center"> </el-table-column>
				<el-table-column prop="GTMC" label="线路名称" width="100" align="center"> </el-table-column>
				<el-table-column prop="QQD" label="起讫点" width="100" align="center"> </el-table-column>
				<el-table-column prop="GLDJ" label="公路等级" align="center"> </el-table-column>
				<el-table-column prop="GN" label="功能"  align="center"> </el-table-column>
				<el-table-column prop="LSGX" label="隶属关系"  align="center"> </el-table-column>
				<el-table-column fixed="right" label="操作" width="300" align="center">
					<template slot-scope="scope">
						<el-button title="查看" icon="al-icon-yulan" type="primary" plain @click="lookClick(scope.row)"></el-button>
						<el-button title="修改" icon="al-icon-xiugai" type="warning" plain @click="editClick(scope.row)"></el-button>
						<el-button title="删除" icon="al-icon-shanchu" type="danger" plain @click="delClick(scope.row)"></el-button>

					</template>
				</el-table-column>
			</el-table>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formeData.CurrentPage"
				  :page-size="formeData.PageSize"
				  :total="total">
		    </el-pagination>
		</div>
		<div>
			<el-dialog :title="dialogTitle"  :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
			 class="newStyleDialog " custom-class="jbqk_add_table1_dialog">
				<gongluHeaderAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag" ></gongluHeaderAdd>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		GetAllBaseTablesBaseAttrs,DeleteBaseTable
	} from '@/api'
	import gongluHeaderAdd from './gonglu_header_add' 
	export default {
		name: "dianliTable",
		props: {},
		components: {
			gongluHeaderAdd,
		},
		computed: {
			...mapGetters(['projectNo','BaseType'])
		},
		data() {
			return {
				titleName:'公路',
				tableData: [],
				activeName: "",
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				total: 0,
				formeData: {
					CurrentPage: 1,
					PageSize: 6,
				},
				tableLoad:false,


			};
		},
		created() {},
		mounted() {
			if (this.projectNo) {
				this.tableInit(); //表格初始化
			}

		},
		methods: {
			tableInit() {
				var data = {
					BaseType: this.BaseType,
					ProjectNo: this.projectNo,
					...this.formeData
				};
				this.tableLoad=true;
				GetAllBaseTablesBaseAttrs(data).then((res) => {
					console.log(res)
					this.tableLoad=false;
					this.tableData = res.list;
					this.total = res.total;
				})
				.catch((error) => {
					this.tableData = [];
					this.tableLoad=false;
					console.log(error)
				})
			},

			handleSizeChange(val) { //每页#条
				this.formeData.PageSize = val;
				this.tableInit();
			},
			handleCurrentChange(val) { //当前第几页
				this.formeData.CurrentPage = val;
				this.tableInit();
			},
			lookClick(row) { //查看
				this.dialogForm = row;
				this.dialogTitle = `查看${this.titleName}调查表`;
				this.dialogType = 'look';
				this.showFlag = true;

			},
			delClick(row) {
				var self=this;
				this.$confirm('此操作将永久删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true,
					type: 'warning'
				}).then(() => {
					DeleteBaseTable({id:row.KeyNo}).then((res) => {
						console.log(res)
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});

							self.tableInit();
					
					}).catch((res) => {
						console.log(res);
					})


				}).catch((res) => {
					
				})
			},
			editClick(row) { //修改
				this.dialogForm = row;
				this.dialogTitle = `修改${this.titleName}调查表`;
				this.dialogType = 'edit';
				this.showFlag = true;

			},
			addClick() { //添加
				this.dialogForm = '';
				this.dialogTitle = `添加${this.titleName}调查表`;
				this.dialogType = 'add';
				this.showFlag = true;

			},
			closeDialog() { //关闭弹出框
				this.tableInit();
			},
			showStudescode(data) { //监听弹出框是关还是闭

			},
		}
	};
</script>


<style scoped="scoped">
	.body_table_mian {
		margin-top: 1vh;
	}
</style>
