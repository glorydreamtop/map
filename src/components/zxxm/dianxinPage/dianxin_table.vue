<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="al-icon-tianjia" @click="addClick()" plain> </el-button>
		</div>
		<div class="body_table_mian">
			<el-table v-loading="tableLoad"  :data="tableData" row-key="id" :tree-props="{children: 'children'}" border style="width: 100%" height="50vh">
				<el-table-column prop="DXBH" label="编号" width="150" align="center"> </el-table-column>
				<el-table-column prop="JCNY" label="建成年月" align="center"> </el-table-column>
				<el-table-column prop="CountyDESC" label="区县" width="100" align="center"> </el-table-column>
				<el-table-column  label="高程范围" align="center"> 
				   <el-table-column prop="GCFW1" label="范围1" width="100" align="center"> </el-table-column>
				   <el-table-column prop="GCFW2" label="范围2" width="100" align="center"> </el-table-column>
				</el-table-column>
				<el-table-column prop="GCLX" label="工程类型" align="center"> </el-table-column>
				<el-table-column prop="XLMC" label="线路名称" width="100" align="center"> </el-table-column>
				<el-table-column prop="QQD" label="起讫点" width="100" align="center"> </el-table-column>
				<el-table-column prop="QS" label="权属部门" align="center"> </el-table-column>
				
				<el-table-column prop="ZCD" label="总长度"  align="center"> </el-table-column>
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
				<dianxinHeaderAdd :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag" ></dianxinHeaderAdd>
			</el-dialog>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
			GetSpecialprojects_BASE,DelSpecialprojects_BASE
	} from '@/api'
	import dianxinHeaderAdd from './dianxin_header_add' 
	export default {
		name: "dianliTable",
		props: {},
		components: {
			dianxinHeaderAdd,
		},
		computed: {
			...mapGetters(['projectNo','TypeName'])
		},
		data() {
			return {
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
					TypeName: this.TypeName,
					ProjectNo: this.projectNo,
					...this.formeData
				};
				this.tableLoad=true;
				GetSpecialprojects_BASE(data).then((res) => {
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
				this.dialogTitle = '查看电力调查表';
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
					DelSpecialprojects_SUB({id:row.KeyNo}).then((res) => {
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
				this.dialogTitle = '编辑电力调查表';
				this.dialogType = 'edit';
				this.showFlag = true;

			},
			addClick() { //添加
				this.dialogForm = '';
				this.dialogTitle = '添加电力调查表';
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
