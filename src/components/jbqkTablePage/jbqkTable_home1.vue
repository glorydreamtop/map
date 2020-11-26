<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="el-icon-plus"  @click="addClick()" plain>  </el-button>
		</div>
		<div class="body_table_mian">
			<el-table :data="tableData" border style="width: 100%" height="25vw">
				<el-table-column :prop="item.prop" :label="item.label" :width="item.width" align="center" v-for="item in elTableColumn">
				</el-table-column>
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
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageData.page"
				 :page-sizes="[10, 20, 50, 100]" :page-size="pageData.limit" layout="total, sizes, prev, pager, next, jumper"
				 :total="total">
				</el-pagination>
			</div>
		</div>
		<div  >
		   <el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog'  :visible.sync="showFlag"  
		      v-model="showFlag" class="newStyleDialog " custom-class="jbqk_add_table1_dialog"	>
		    <jbFlyTable1Add  :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag" ></jbFlyTable1Add>	
		  </el-dialog>
		</div>
	</div>
</template>

<script>
	import jbFlyTable1Add from '@/components/jbqkTablePage/jbqk_fly_table1_add' //农村基本情况调查表
	export default {
		name: "jbqlTable_home",
		props: {},
		components: {
			jbFlyTable1Add,
		},
		data() {
			return {
				elTableColumn: [{
						label: '编号',
						prop: 'code',
						width: '100'
					},
					{
						label: '申请时间',
						prop: 'date',
						width: '180'
					},
					{
						label: '地区',
						prop: 'ditu',
						width: ''
					},
					{
						label: '地区类型',
						prop: 'diquType',
						width: ''
					},
					{
						label: '状态',
						prop: 'status',
						width: ''
					},
					{
						label: '乡镇',
						prop: 'xiangzhen',
						width: ''
					},
					{
						label: '村委会',
						prop: 'cunweihui',
						width: ''
					},
				],
				tableData: [],
				activeName: "",
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				total: 4,
				formeData: {
					page: 1,
					limit: 10,
					tableIndex: '1'
				},
				pageData: {
					page: 1,
					limit: 10
				}

			};
		},
		created() {},
		mounted() {
			this.tableInit();//表格初始化
		},
		
		methods: {
			tableInit(){
				var tableData=[{
					code: '001',
					date: '2016-05-02',
					name: '王小虎',
					ditu: '蓟州区',
					diquType: '水库淹没区',
					xiangzhen: '别山镇',
					cunweihui: '大别山村',
					status: '未审批'

				}, {
					date: '2016-05-04',
					code: '002',
					name: '王小虎',
					diquType: '水库影响区',
					ditu: '津南区',
					xiangzhen: '咸水沽镇',
					cunweihui: '黄水村',
					status: '未审批'
				}, {
					date: '2016-05-01',
					code: '003',
					name: '王小虎',
					diquType: '枢纽工程建设区',
					ditu: '武清区',
					xiangzhen: '黄庄村镇',
					cunweihui: '朱庄子村',
					status: '未审批'
				}, {
					date: '2016-05-03',
					code: '004',
					name: '王小虎',
					ditu: '静海区',
					diquType: '水库影响区',
					xiangzhen: '茅台镇',
					cunweihui: '别久村',
					status: '未审批'
				},];
				this.tableData=tableData;
			},
			
			handleSizeChange(val) { //每页#条
				this.pageData.limit = val;
				console.log(this.formeData);
			},
			handleCurrentChange(val) { //当前第几页
				this.pageData.page = val;
				console.log(this.formeData);
			},
			lookClick(row) { //查看农村基本情况调查表
				this.dialogForm = row;
				this.dialogTitle = '查看农村基本情况调查表';
				this.dialogType = 'look';
				this.showFlag=true;

			},
			addClick(){//添加
			   this.dialogForm ='';   
			   this.dialogTitle = '添加农村基本情况调查表';
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
