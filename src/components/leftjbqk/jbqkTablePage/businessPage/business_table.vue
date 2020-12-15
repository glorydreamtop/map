<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="el-icon-plus"  @click="addClick()" plain>  </el-button>
		</div>
		<div class="body_table_mian">
			<el-table v-loading="tableLoad" element-loading-text="客官请稍后" element-loading-spinner="el-icon-loading" class="fixTable49"
			                     element-loading-background="#022333" :data="tableData"  border style="width: 100%" height="50vh">
				<el-table-column prop="SerialNumber" label="编号" width="150" align="center"> </el-table-column>
				<el-table-column prop="Createdate" label="申请时间" align="center"> </el-table-column>
				<el-table-column prop="CountyDESC" label="区县" width="100" align="center"> </el-table-column>
				<el-table-column prop="Region" label="地区类型" align="center"> </el-table-column>
				<el-table-column prop="" label="状态" width="140" align="center"> </el-table-column>
				<el-table-column  label="高程范围"  align="center">
					<el-table-column prop="AltitudeStart" label="高程1"  align="center">
					</el-table-column>
					<el-table-column prop="AltitudeEnd" label="高程2"  align="center">
					</el-table-column>
				</el-table-column>
				<el-table-column fixed="right" label="操作" width="300" align="center">
					<template slot-scope="scope">
						<el-button title="查看" icon="el-icon-view" type="primary" plain @click="lookClick(scope.row)"></el-button>
						<el-button title="修改" icon="el-icon-edit" type="warning" plain @click="editClick(scope.row)"></el-button>
						<el-button title="删除" icon="el-icon-delete" type="danger" plain @click="delClick(scope.row)"></el-button>
						<el-button title="发起审批" icon="el-icon-s-check" type="success" plain></el-button>
			
					</template>
				</el-table-column>
			</el-table>
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formeData.CurrentPage"
				  :page-size="formeData.PageSize"
				 :total="total">
				</el-pagination>

		</div>
		<div>
			<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
			 class="newStyleDialog " custom-class="jbqk_add_table1_dialog">
				<businessHeaderAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></businessHeaderAdd>
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
	import businessHeaderAdd from './business_header_add' //城市集镇基本情况调查表
	export default {
		name: "jbqlTable_home",
		props: {},
		components: {
			businessHeaderAdd
		},
		computed: {
			...mapGetters(['projectNo','BaseType'])
		},
		data() {
			return {
				tableData: [],
				activeName: "",
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				tableLoad:false,
				total: 4,
				formeData: {
					CurrentPage: 1,
					PageSize: 5,
				},
				tableLoad:false,

			};
		},
		created() {},
		mounted() {
		   this.tableInit(); //表格初始化
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
			lookClick(row) { //查看企事业单位基本情况调查表
				this.dialogForm = row;
				this.dialogTitle = '查看企事业单位基本情况调查表';
				this.dialogType = 'look';
				this.showFlag = true;

			},
			addClick() { //添加
				this.dialogForm = '';
				this.dialogTitle = '添加企事业单位基本情况调查表';
				this.dialogType = 'add';
				this.showFlag = true;

			},
			editClick(row) { //修改
				this.dialogForm = row;
				this.dialogTitle = '编辑企事业单位基本情况调查表';
				this.dialogType = 'edit';
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
