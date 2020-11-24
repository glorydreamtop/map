<template>
	<div class="tableMain">
		<div class="header_table_title">
			<el-button icon="el-icon-add">添加</el-button>
		</div>
		<div class="body_table_mian">
			<el-table :data="tableData" border style="width: 100%" height="50vh">
				<el-table-column prop="date" label="日期" width="180"> </el-table-column>
				<el-table-column prop="name" label="姓名" width="180"> </el-table-column>
				<el-table-column prop="address" label="地址"></el-table-column>
				<el-table-column fixed="right" label="操作" width="100">
					<template slot-scope="scope" minWidth="250">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button type="text" size="small">编辑</el-button>
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
	</div>
</template>

<script>
	import jbqkTableHome from '@/components/jbTablePage/jbTable_home.vue' //基本情况表-更多操作
	export default {
		name: "Index",
		props: {},
		data() {
			return {
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}, {
					date: '2016-05-04',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1517 弄'
				}, {
					date: '2016-05-01',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1519 弄'
				}, {
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1516 弄'
				}, ],
				activeName: "",
				dialogTitle: '', //弹出框标题
				dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType: '', //弹出框操作类型
				total:4,
				pageData:{
					page:1,
					limit:10
				}
				
			};
		},
		created() {},
		mounted() {},
		components: {
			jbqkTableHome
		},
		methods: {
			handleSizeChange(val) {//每页#条
						this.pageData.limit=val;
						console.log(this.formeData);
			},
			handleCurrentChange(val) {//当前第几页
						this.pageData.page=val;
			      console.log(this.formeData);
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
