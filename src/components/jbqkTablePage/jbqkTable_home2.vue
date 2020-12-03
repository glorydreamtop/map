<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="el-icon-plus"  @click="addClick()" plain>  </el-button>
		</div>
		<div class="body_table_mian">
			<el-table :data="tableData" border style="width: 100%" height="25vw">
				<!-- <el-table-column type="index" label="序号" width="75" align="center"> </el-table-column> -->
				<el-table-column prop="SerialNumber" label="编号" width="100" align="center"> </el-table-column>
				<el-table-column prop="Createdate" label="申请时间" width="100" align="center"> </el-table-column>
				<el-table-column prop="CountyDESC" label="区县" width="100" align="center"> </el-table-column>
				<el-table-column prop="Region" label="地区类型" width="100" align="center"> </el-table-column>
				<el-table-column prop="" label="状态" width="100" align="center"> </el-table-column>
				<el-table-column prop="TownDESC" label="城市集镇名称" width="100" align="center"> </el-table-column>
				<el-table-column prop="VillageDESC" label="隶属关系" width="100" align="center"> </el-table-column>
				<el-table-column prop="VillageDESC" label="隶属关系" width="100" align="center"> </el-table-column>
				<el-table-column fixed="right" label="操作" width="300" align="center">
					<template slot-scope="scope">
						<el-button title="查看"  icon="el-icon-view"  type="primary" plain @click="lookClick(scope.row)"></el-button>
						<el-button title="修改"   icon="el-icon-edit" type="warning" plain></el-button>
						<el-button title="删除"  icon="el-icon-delete" type="danger" plain></el-button>
						<el-button title="发起审批"  icon="el-icon-s-check" type="success" plain></el-button>
					</template>
				</el-table-column>
			</el-table>


			<div class="table_page">
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="formeData.CurrentPage"
				 :page-sizes="[10, 20, 50, 100]" :page-size="formeData.PageSize" layout="total, sizes, prev, pager, next, jumper"
				 :total="total">
				</el-pagination>
			</div>

		</div>
		<div  >
		   <el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog'  :visible.sync="showFlag"  
		      v-model="showFlag" class="newStyleDialog " custom-class="jbqk_add_table1_dialog"	>
			<jbFlyTable2Add  :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag" ></jbFlyTable2Add>
		  </el-dialog>
		</div>
	</div>
</template>

<script>
	import {mapGetters} from 'vuex'
	import {GetAllBaseTablesBaseAttrs} from '@/api'
	import jbFlyTable2Add from '@/components/jbqkTablePage/jbqk_fly_table2_add' //城市集镇基本情况调查表
	export default {
		name: "jbqlTable_home",
		props: {},
		computed: {
			...mapGetters(['projectNo'])
		},
		components: {
			jbFlyTable2Add
		},
		data() {
			return {
				BaseType: 'CHENGSHI',
				tableData: [],
				activeName: "",
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				total: 4,
				formeData: {
					CurrentPage: 1,
					PageSize: 10,
				},

			};
		},
		created() {},
		mounted() {
			this.tableInit();//表格初始化
		},
		
		methods: {
			tableInit(){
				var data = {
					BaseType: this.BaseType,
					ProjectNo: this.projectNo,
					...this.formeData
				};
				GetAllBaseTablesBaseAttrs(data).then((res) => {
					console.log(res)
					
					this.tableData = res.list;
					this.total=res.total;
				})
				.catch((error) => {
					this.tableData = [];
					console.log(error)
				})
			},
			
			handleSizeChange(val) { //每页#条
				this.formeData.PageSize = val;
				console.log(this.formeData);
			},
			handleCurrentChange(val) { //当前第几页
				this.formeData.CurrentPage = val;
				console.log(this.formeData);
			},
			lookClick(row) { //查看城市集镇基本情况调查表
				this.dialogForm = row;
				this.dialogTitle = '查看城市集镇基本情况调查表';
				this.dialogType = 'look';
				this.showFlag=true;

			},
			addClick(){//添加
			   this.dialogForm ='';
			   this.dialogTitle = '添加城市集镇基本情况调查表';
			   this.dialogType = 'add';
			   this.showFlag=true;
				
			},
			closeDialog() { //关闭弹出框

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
