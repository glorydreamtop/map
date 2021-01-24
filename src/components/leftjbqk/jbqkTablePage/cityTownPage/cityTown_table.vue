<template>
	<div class="tableMain">
		<el-button icon="al-icon-tianjia" @click="addClick()"></el-button>
		<el-table :data="tableData" border v-loading="tableLoad" class="fixTable49" style="width: 100%" height="50vh">
			<el-table-column prop="SerialNumber" label="编号" width="150" align="center">
			</el-table-column>
			<el-table-column prop="Createdate" label="申请时间" align="center">
			</el-table-column>
			<el-table-column prop="CountyDESC" label="区县" width="100" align="center">
			</el-table-column>
			<el-table-column prop="Region" label="工程类型" align="center">
			</el-table-column>
			<el-table-column prop="" label="状态" width="100" align="center">
			</el-table-column>
			<el-table-column prop="CityTownName" label="城市集镇名称" align="center">
			</el-table-column>
			<el-table-column prop="Affiliation" label="隶属关系" width="100" align="center">
			</el-table-column>
			<el-table-column prop="Nature" label="性质" align="center">
			</el-table-column>
			<el-table-column prop="Grade" label="等级" align="center">
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="300" align="center">
				<template slot-scope="scope">
					<el-button title="查看" icon="al-icon-yulan" type="primary" plain @click="lookClick(scope.row)"></el-button>
					<el-button title="修改" icon="al-icon-xiugai" type="warning" plain @click="editClick(scope.row)">
					</el-button>
					<el-button title="删除" icon="al-icon-shanchu" type="danger" plain @click="delClick(scope.row)"></el-button>
					<el-button title="发起审批" icon="el-icon-s-check" type="success" plain></el-button>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formeData.CurrentPage"
		 :page-size="formeData.PageSize" :total="total">
		</el-pagination>
		<div>
			<el-dialog :title="dialogTitle" @close="closeDialog" :visible.sync="showFlag" :append-to-body="true" v-model="showFlag"
			 class="newStyleDialog" custom-class="jbqk_add_table1_dialog">
				<cityTownHeaderAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></cityTownHeaderAdd>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import {
		GetAllBaseTablesBaseAttrs,
		DeleteBaseTable
	} from "@/api";
	import cityTownHeaderAdd from "./cityTown_header_add"; //城市集镇基本情况调查表
	export default {
		name: "jbqlTable_home",
		props: {},
		computed: {
			...mapGetters(["projectNo"]),
		},
		components: {
			cityTownHeaderAdd,
		},
		data() {
			return {
				BaseType: "CHENGSHI",
				tableData: [],
				activeName: "",
				dialogTitle: "", //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				tableLoad: false,
				dialogType: "", //弹出框操作类型
				total: 4,
				formeData: {
					CurrentPage: 1,
					PageSize: 6,
				},
			};
		},
		created() {},
		mounted() {
			this.tableInit(); //表格初始化
		},

		methods: {
			tableInit() {
				this.tableLoad = true;
				var data = {
					BaseType: this.BaseType,
					ProjectNo: this.projectNo,
					...this.formeData,
				};
				GetAllBaseTablesBaseAttrs(data)
					.then((res) => {
						this.tableLoad = false;
						this.tableData = res.list;
						this.total = res.total;
					})
					.catch((error) => {
						this.tableLoad = false;
						this.tableData = [];
						console.log(error);
					});
			},

			handleSizeChange(val) {
				//每页#条
				this.formeData.PageSize = val;
				console.log(this.formeData);
			},
			handleCurrentChange(val) {
				//当前第几页
				this.formeData.CurrentPage = val;
				console.log(this.formeData);
			},
			lookClick(row) {
				//查看城市集镇基本情况调查表
				this.dialogForm = row;
				this.dialogTitle = "查看城市集镇基本情况调查表";
				this.dialogType = "look";
				this.showFlag = true;
			},
			addClick() {
				//添加
				this.dialogForm = "";
				this.dialogTitle = "添加城市集镇基本情况调查表";
				this.dialogType = "add";
				this.showFlag = true;
			},
			editClick(row) {
				//添加
				this.dialogForm = row;
				this.dialogTitle = "修改城市集镇基本情况调查表";
				this.dialogType = "edit";
				this.showFlag = true;
			},
			delClick(row) {
				var self = this;
				this.$confirm("此操作将永久删除, 是否继续?", "提示", {
						confirmButtonText: "确定",
						cancelButtonText: "取消",
						center: true,
						type: "warning",
					})
					.then(() => {
						DeleteBaseTable({
								id: row.KeyNo
							})
							.then((res) => {
								console.log(res);
								self.$message({
									message: "操作成功",
									type: "success",
									center: true,
								});

								self.tableInit();
							})
							.catch((res) => {
								console.log(res);
							});
					})
					.catch((res) => {});
			},
			closeDialog() {
				//关闭弹出框
				this.tableInit(); //表格初始化
			},
			showStudescode(data) {
				//监听弹出框是关还是闭
			},
		},
	};
</script>


<style lang="scss" scoped="scoped">
	.body_table_mian {
		margin-top: 1vh;
	}

	.el-button {
		margin-bottom: 10px;
	}
</style>
