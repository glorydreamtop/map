<template>
	<div class="tableMain">
		<div class="header_table_title">
			<!-- <label>调查表类型：</label>
			<el-select v-model="formeData.tableIndex" filterable placeholder="请选择调查表类型" @change="change_tabkeType">
				<el-option key="1" label="农村基本情况调查表" value="1"></el-option>
				<el-option key="2" label="城市集镇基本情况调查表" value="2"></el-option>
				<el-option key="3" label="专业项目基本情况调查表" value="3"></el-option>
				<el-option key="4" label="企事业单位基本情况调查表" value="4"></el-option>
			</el-select> -->
			<el-button icon="el-icon-add"  @click="addClick()">添加</el-button>
		</div>
		<div class="body_table_mian">
			<el-table :data="tableData" border style="width: 100%" height="50vh">
				<!-- <el-table-column type="index" label="序号" width="75" align="center"> </el-table-column> -->
				<el-table-column :prop="item.prop" :label="item.label" :width="item.width" align="center" v-for="item in elTableColumn">
				</el-table-column>
				<el-table-column label="操作" width="300" align="center">
					<template slot-scope="scope">
						<el-button size="mini" type="primary" plain @click="lookClick(scope.row)">查看</el-button>
						<el-button size="mini" type="warning" plain>编辑</el-button>
						<el-button size="mini" type="danger" plain>删除</el-button>
						<el-button size="mini" type="success" plain>发起审批</el-button>
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
	import jbFlyTable2Add from '@/components/jbqkTablePage/jbqk_fly_table2_add' //城市集镇基本情况调查表
	export default {
		name: "jbqlTable_home",
		props: {},
		components: {
			jbFlyTable1Add,
			jbFlyTable2Add
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
			change_tabkeType(data) { //调查表类型
				if (data == '1') {
					this.elTableColumn = [{
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
					];
				} else if (data == '2') {
					this.elTableColumn = [{
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
							label: '城市集镇名称',
							prop: 'xiangzhen',
							width: ''
						},
						{
							label: '隶属关系',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '等级',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '功能',
							prop: 'cunweihui',
							width: ''
						},

					];
				} else if (data == '3') {
					this.elTableColumn = [{
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
							label: '项目名称',
							prop: 'xiangzhen',
							width: ''
						},
						{
							label: '项目类别',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '项目规划情况',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '项目规模',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '功能',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '受影响程度',
							prop: 'cunweihui',
							width: ''
						},

					];
				} else {
					this.elTableColumn = [{
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
							label: '单位名称',
							prop: 'xiangzhen',
							width: ''
						},
						{
							label: '单位性质',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '主管部门',
							prop: 'cunweihui',
							width: ''
						},
						{
							label: '受影响程度',
							prop: 'cunweihui',
							width: ''
						},

					];
				}
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
