<template>
	<div id="element_add">
		<!--员工弹出框-->
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="户信息调查" name="1">
						<div class="formeBody">
							<el-button size="mini" @click="addItem('huxinxidiaochaFlyAdd','添加户信息调查')" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" @click="editItem('huxinxidiaochaFlyAdd','修改户信息调查')" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" @click="delItem(1)"  icon="el-icon-delete" plain></el-button>
							<!-- {{parcelData}} -->
							<el-table :data="parcelData" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column type="index" label="编号" width="80" align="center"></el-table-column>
								<el-table-column prop="HZ" label="户主姓名" width="180" align="center"></el-table-column>
								<el-table-column prop="DCRY" label="调查人" width="180" align="center"></el-table-column>
								<el-table-column prop="DCSJ" label="调查时间" width="180" align="center"></el-table-column>
								<el-table-column prop="GCLX" label="工程类型" width="180" align="center"></el-table-column>
								<el-table-column  label="高程范围" width="200" align="center">
									<el-table-column prop="GCFW1" label="范围1" width="100" align="center"></el-table-column>
									<el-table-column prop="GCFW2" label="范围2" width="100" align="center"></el-table-column>
								</el-table-column>
								<el-table-column prop="XXDZ" label="家庭住址"  align="center"></el-table-column>
								<!-- <el-table-column prop="BZ" label="备注" align="center"></el-table-column> -->

							</el-table>
						</div>

					</el-collapse-item>
					<el-collapse-item title="人口信息" name="2">
						<div class="formeBody">
							<el-button size="mini" @click="addItem('renkouxinxiFlyAdd','添加人口信息调查')" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini"  @click="editItem('renkouxinxiFlyAdd','修改人口信息调查')" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" @click="delItem(2)" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData_renkou" border highlight-current-row style="width: 100%" class="margin-top-m">
								<el-table-column prop="code" label="编号" width="80" align="center"></el-table-column>
								<el-table-column prop="name" label="姓名" width="180" align="center"></el-table-column>
								<el-table-column prop="length" label="性别" width="80" align="center"></el-table-column>
								<el-table-column prop="length" label="民族" width="80" align="center"></el-table-column>
								<el-table-column prop="unit" label="与户主关系" width="130" align="center"></el-table-column>
								<el-table-column prop="length" label="出生年月" width="180" align="center"></el-table-column>
								<el-table-column prop="address" label="文化程度" align="center"></el-table-column>
								<el-table-column prop="length" label="从事职业" width="130" align="center"></el-table-column>
								<el-table-column prop="address" label="户口性质" align="center"></el-table-column>
								<el-table-column prop="address" label="户籍所在地" align="center"></el-table-column>
								<el-table-column prop="address" label="身份证号码" align="center"></el-table-column>
							</el-table>
						</div>


					</el-collapse-item>
					<el-collapse-item title="房屋信息" name="3">
						<div class="formeBody">
							<el-button size="mini" @click="addItem('fangwuxinxiFlyAdd','添加房屋信息调查')" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini"  @click="editItem('fangwuxinxiFlyAdd','修改房屋信息调查')" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini"  @click="delItem(3)" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData_fangwu" border highlight-current-row style="width: 100%" class="margin-top-m">
								<el-table-column prop="code" label="编号" width="80" align="center"></el-table-column>
								<el-table-column prop="name" label="房屋名称" width="180" align="center"></el-table-column>
								<el-table-column prop="length" label="用途" width="80" align="center"></el-table-column>
								<el-table-column prop="length" label="结构类型" width="80" align="center"></el-table-column>
								<el-table-column prop="unit" label="建筑风格或形式" width="130" align="center"></el-table-column>
								<el-table-column prop="length" label="屋面材料" width="180" align="center"></el-table-column>
								<el-table-column prop="address" label="层数" align="center"></el-table-column>
								<el-table-column prop="length" label="层高" width="130" align="center"></el-table-column>
								<el-table-column prop="address" label="丈量尺寸(m×m)" align="center"></el-table-column>
								<el-table-column prop="address" label="建筑面积(㎡)" align="center"></el-table-column>
								<el-table-column prop="address" label="备注" align="center"></el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="附属物信息" name="4">
						<div class="formeBody">
							<el-button size="mini" @click="addItem('fushuwuFlyAdd','添加附属物信息')" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini"  @click="editItem('fushuwuFlyAdd','修改附属物信息')" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini"  @click="delItem(4)" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData_fushuwu" border highlight-current-row style="width: 100%" class="margin-top-m">
								<el-table-column prop="code" label="编号" width="80" align="center"></el-table-column>
								<el-table-column prop="name" label="项目" width="180" align="center"></el-table-column>
								<el-table-column prop="length" label="单位" width="80" align="center"></el-table-column>
								<el-table-column prop="length" label="结构材料" width="80" align="center"></el-table-column>
								<el-table-column prop="unit" label="规格" width="130" align="center"></el-table-column>
								<el-table-column prop="length" label="丈量尺寸(m×m)" width="180" align="center"></el-table-column>
								<el-table-column prop="address" label="数量" align="center"></el-table-column>
								<el-table-column prop="address" label="备注" align="center"></el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="零星果木" name="5">
						<div class="formeBody">
							<el-button size="mini" @click="addItem('lingxingguomuFlyAdd','添加零星果木')" icon="el-icon-plus"></el-button>
							<el-button title="修改"   @click="editItem('lingxingguomuFlyAdd','修改零星果木')" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除"  @click="delItem(5)" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData_lingxingguomu" border highlight-current-row style="width: 100%" class="margin-top-m">
								<el-table-column prop="code" label="编号" width="200" align="center"></el-table-column>
								<el-table-column prop="name" label="类别" align="center"></el-table-column>
								<el-table-column prop="length" label="品种" width="200" align="center"></el-table-column>
								<el-table-column prop="length" label="规格" width="200" align="center"></el-table-column>
								<el-table-column prop="unit" label="数量" width="200" align="center"></el-table-column>
								<el-table-column prop="address" label="备注" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
				</el-collapse>

				<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " :custom-class="componentOpen+'_dialog'">
					<!-- 动态组件 -->
					<component :is="componentOpen" :dialog-type="dialogType_two" v-on:showStudes="showStudescode" :dialog-form="dialogForm_two"></component>
				</el-dialog>
			</div>

		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		GetHouseholds,DelHousehold
	} from '@/api';
	import fangwuxinxiFlyAdd from '@/components/hxx/fangwuxinxi_fly_add' //房屋信息添加
	import fushuwuFlyAdd from '@/components/hxx/fushuwu_fly_add' //附属物添加
	import huxinxidiaochaFlyAdd from '@/components/hxx/huxinxidiaocha_fly_add' //户信息调查添加
	import lingxingguomuFlyAdd from '@/components/hxx/lingxingguomu_fly_add' //零星果木添加
	import renkouxinxiFlyAdd from '@/components/hxx/renkouxinxi_fly_add' //零星果木添加
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['projectNo','parcelId','Locationno'])
		},
		components: {
			fangwuxinxiFlyAdd,
			fushuwuFlyAdd,
			huxinxidiaochaFlyAdd,
			lingxingguomuFlyAdd,
			renkouxinxiFlyAdd,
		},
		data() {
			return {
				dialogTitle: '', //弹出框标题
				dialogForm_two: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType_two: '', //弹出框操作类型
				activeFormIndex: ['1'], //当前手风琴默认打开
				tableData_hu: [], //户信息数据
				tableData_renkou: [], //人口信息
				tableData_fangwu: [], //房屋信息
				tableData_fushuwu: [], //附属物信息
				tableData_lingxingguomu: [], //零星果木信息
				componentOpen: '', //当前打开添加组件名
				parcelData:[],//户信息

			}
		},
		dialogType: {
			handler: function(val, oldval) {
				this.dialogType = val;
				this.init();
			},
			deep: true //
		},
		props: ['dialogType', 'dialogForm'],
		mounted: function() {
			// if (this.dialogType == 'edit' || this.dialogType == 'look') {
			// 	// this.dialogForm.sysName=[];
			// 	this.disabled = true;
			// }
			this.GetHouseholdsInit(); //户信息数据

		},

		methods: {
			rowClick(row, column){//单击表格一行
				console.log(row, column);		
				this.dialogForm_two=row;
			},
			addItem(type, title) { //添加项目
				this.dialogTitle = title;
				this.componentOpen = type;
				this.dialogType_two = 'add';
				this.showFlag = true;
				this.dialogForm_two = '';
			},
			editItem(index, title) { //添加项目
			    // var urlData=['DelHousehold']
			    if(this.dialogForm_two){
					this.dialogTitle = title;
					this.componentOpen = type;
					this.dialogType_two = 'edit';
					this.showFlag = true;
				}else{
					this.$message({
					  message: '请选择要修改的户信息',
					  type: 'warning'
					});
				}
				
			},
			delItem(url){
				if(this.dialogForm_two){
					var self=this;
					this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						center: true,
						type: 'warning'
					}).then(() => {
						DelHousehold({id:this.dialogForm_two.KeyNo}).then((res) => {
							console.log(res)
								self.$message({
									message: '操作成功',
									type: 'success',
									center: true
								});
								self.GetHouseholdsInit();
						
						}).catch((res) => {
							console.log(res);
						})
					
					
					}).catch((res) => {
						
					})
				}else{
					this.$message({
						message: '请选择要删除的数据项',
						type: 'error',
						center: true
					})
				}
			},
			closeDialog() { //关闭弹出框

			},
			showStudescode(data) { //监听弹出框是关还是闭
				this.showFlag = data;
				this.GetHouseholdsInit();

			},
			GetHouseholdsInit() {
                var data={
					Locationno:this.Locationno,
					CurrentPage: 1,
					PageSize: 10
				};
				GetHouseholds(data).then((res) => {
						console.log(res, '地块')
						this.parcelData = res.list;

					})
					.catch((error) => {
						this.parcelData = [];
						console.log(error)
					})
			},


		}
	}
</script>
<style scoped="scoped">
	.reyuan_form {
		height: 630px;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
