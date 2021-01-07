<template>
	<div id="element_add">
		<!--员工弹出框-->
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="企事业基本信息" name="1">
							<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
								<el-form-item label="工程类型:" prop="GCLX">
									<el-select v-model="ruleForm.GCLX" filterable placeholder="请选择调查表类型" class="input-200" :disabled="disabled">
										<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
										<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
										<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="高程范围:">
									<el-input v-model="ruleForm.GCFW1" :disabled="disabled" class="input-90"></el-input>
									<span>---</span>
									<el-input v-model="ruleForm.GCFW2" :disabled="disabled" class="input-90"></el-input>
								</el-form-item>
								<el-form-item label="户主姓名:" prop="HZ">
									<el-input v-model="ruleForm.HZ" :disabled="disabled" class="input-200"></el-input>
								</el-form-item>
								<el-form-item label="调查人:" v-if="dialogType=='edit'">
									<el-input v-model="ruleForm.DCRY" :disabled="dialogType=='edit'?'disabled':''" class="input-200"></el-input>
								</el-form-item>
								<el-form-item label="调查时间:" v-if="dialogType=='edit'">
									<el-input v-model="ruleForm.DCSJ"  class="input-200" :disabled="dialogType=='edit'?'disabled':''"></el-input>
								</el-form-item>
							</el-form>
							<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
								<el-form-item label="家庭住址:" prop="XXDZ">
									<el-input v-model="ruleForm.XXDZ" :disabled="disabled" ></el-input>
								</el-form-item>
								<el-form-item label="备注:">
									<el-input v-model="ruleForm.BZ" :rows="4" type="textarea" :disabled="disabled" ></el-input>
								</el-form-item>
							</el-form>
							<div class="margin-top-l text-center " v-show="!disabled">
								<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="loading">{{loading===false?'提交':'提交中'}}</el-button>
							</div>
					</el-collapse-item>
					<el-collapse-item title="企事业用地" name="2" >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('renkouxinxiFlyAdd',2)" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" @click="editItem('renkouxinxiFlyAdd',2)" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" @click="delItem(2)" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData0" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick"> 
								<el-table-column prop="RKBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="XM" label="姓名" width="180" align="center"></el-table-column>
								<el-table-column prop="XB" label="性别" width="100" align="center"></el-table-column>
								<el-table-column prop="MZ" label="民族" width="100" align="center"></el-table-column>
								<el-table-column prop="YHZGX" label="与户主关系" width="130" align="center"></el-table-column>
								<el-table-column prop="CSNY" label="出生年月" width="180" align="center"></el-table-column>
								<el-table-column prop="HKSZD" label="户籍所在地" align="center"></el-table-column>
								<el-table-column prop="SFZH" label="身份证号码" align="center"></el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="企事业房屋及建筑物" name="3"  >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('fangwuxinxiFlyAdd',3)" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" @click="editItem('fangwuxinxiFlyAdd',3)" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" @click="delItem(3)" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData1" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column prop="FWBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="FWMC" label="房屋名称" width="180" align="center"></el-table-column>
								<el-table-column prop="JGLX_DESC" label="结构类型" width="100" align="center"></el-table-column>
								<el-table-column prop="DEDM_DESC" label="定额名称"  align="center"></el-table-column>
								<el-table-column prop="WMCL" label="屋面材料" align="center"></el-table-column>
								<el-table-column prop="CS" label="层数" width="90"  align="center"></el-table-column>
								<el-table-column prop="CGM	" label="层高(m)"  width="90"  align="center"></el-table-column>
								<el-table-column prop="ZLCCMM" label="丈量尺寸(m×m)" width="90"  align="center"></el-table-column>
								<el-table-column prop="JZMJM2" label="建筑面积(㎡)" width="90"  align="center"></el-table-column>
								<el-table-column prop="DEDJ" label="定额单价	"  width="100" align="center"></el-table-column>
								<el-table-column prop="DXHJ" label="单位合计" width="110" align="center"></el-table-column>
								
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="企事业零星树木" name="4"  >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('fushuwuFlyAdd',4)" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" @click="editItem('fushuwuFlyAdd',4)" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" @click="delItem(4)" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData2" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column prop="FSWBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="FWWMC" label="附属物名称	" width="180" align="center"></el-table-column>
								<el-table-column prop="JGLX_DESC" label="结构类型" width="100" align="center"></el-table-column>
								<el-table-column prop="FSWDEDM_DESC" label="附属物定额代码"  align="center"></el-table-column>
								<el-table-column prop="FSWJGCL" label="结构材料" align="center" width="110"></el-table-column>
								<el-table-column prop="ZLCC" label="丈量尺寸(m×m)" width="140" align="center"></el-table-column>
								<el-table-column prop="FSWGG" label="规格" width="110"  align="center"></el-table-column>
								<el-table-column prop="DW" label="单位" width="80" align="center"></el-table-column>
								<el-table-column prop="FSWSL" label="数量" width="100" align="center"></el-table-column>
								<el-table-column prop="DEDJ" label="定额单价	"  width="100" align="center"></el-table-column>
								<el-table-column prop="DWHJ" label="单位合计" width="110" align="center"></el-table-column>
								
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="企事业基础设施" name="5"  >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('lingxingguomuFlyAdd',5)" icon="el-icon-plus"></el-button>
							<el-button title="修改" @click="editItem('lingxingguomuFlyAdd',5)" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" @click="delItem(5)" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData3" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column prop="GMBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="GMMC" label="果木名称	" align="center"></el-table-column>
								<el-table-column prop="GMLB_DESC" label="类别" align="center"></el-table-column>
								<el-table-column prop="DEDM_DESC" label="品种"  align="center"></el-table-column>
								<el-table-column prop="GMGG" label="规格" width="120"  align="center"></el-table-column>
								<el-table-column prop="GMSL" label="数量" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDW" label="单位" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDJ" label="单价" width="100" align="center"></el-table-column>
								<el-table-column prop="GMGJ" label="合计" width="120" align="center"></el-table-column>
								<!-- <el-table-column prop="address" label="备注" align="center"></el-table-column> -->

							</el-table>
						</div>
					</el-collapse-item>
				    <el-collapse-item title="企事业生产设施" name="6" >
				    	<div class="formeBody">
				    		<el-button size="mini" @click="addItem('lingxingguomuFlyAdd',6)" icon="el-icon-plus"></el-button>
				    		<el-button title="修改" @click="editItem('lingxingguomuFlyAdd',6)" size="mini" icon="el-icon-edit" plain></el-button>
				    		<el-button title="删除" @click="delItem(5)" size="mini" icon="el-icon-delete" plain></el-button>
				    		<el-table :data="tableData3" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
				    			<el-table-column prop="GMBH" label="编号"  align="center"></el-table-column>
				    			<el-table-column prop="GMMC" label="果木名称	" align="center"></el-table-column>
				    			<el-table-column prop="GMLB_DESC" label="类别" align="center"></el-table-column>
				    			<el-table-column prop="DEDM_DESC" label="品种"  align="center"></el-table-column>
				    			<el-table-column prop="GMGG" label="规格" width="120"  align="center"></el-table-column>
				    			<el-table-column prop="GMSL" label="数量" width="100" align="center"></el-table-column>
				    			<el-table-column prop="GMDW" label="单位" width="100" align="center"></el-table-column>
				    			<el-table-column prop="GMDJ" label="单价" width="100" align="center"></el-table-column>
				    			<el-table-column prop="GMGJ" label="合计" width="120" align="center"></el-table-column>
				    			<!-- <el-table-column prop="address" label="备注" align="center"></el-table-column> -->
				    
				    		</el-table>
				    	</div>
				    </el-collapse-item>
					<el-collapse-item title="企事业存货" name="7"  >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('lingxingguomuFlyAdd',7)" icon="el-icon-plus"></el-button>
							<el-button title="修改" @click="editItem('lingxingguomuFlyAdd',7)" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" @click="delItem(5)" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData3" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column prop="GMBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="GMMC" label="果木名称	" align="center"></el-table-column>
								<el-table-column prop="GMLB_DESC" label="类别" align="center"></el-table-column>
								<el-table-column prop="DEDM_DESC" label="品种"  align="center"></el-table-column>
								<el-table-column prop="GMGG" label="规格" width="120"  align="center"></el-table-column>
								<el-table-column prop="GMSL" label="数量" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDW" label="单位" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDJ" label="单价" width="100" align="center"></el-table-column>
								<el-table-column prop="GMGJ" label="合计" width="120" align="center"></el-table-column>
								<!-- <el-table-column prop="address" label="备注" align="center"></el-table-column> -->
					
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="企事业生产经营状况" name="8"  >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('lingxingguomuFlyAdd',8)" icon="el-icon-plus"></el-button>
							<el-button title="修改" @click="editItem('lingxingguomuFlyAdd',8)" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" @click="delItem(5)" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData3" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column prop="GMBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="GMMC" label="果木名称	" align="center"></el-table-column>
								<el-table-column prop="GMLB_DESC" label="类别" align="center"></el-table-column>
								<el-table-column prop="DEDM_DESC" label="品种"  align="center"></el-table-column>
								<el-table-column prop="GMGG" label="规格" width="120"  align="center"></el-table-column>
								<el-table-column prop="GMSL" label="数量" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDW" label="单位" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDJ" label="单价" width="100" align="center"></el-table-column>
								<el-table-column prop="GMGJ" label="合计" width="120" align="center"></el-table-column>
								<!-- <el-table-column prop="address" label="备注" align="center"></el-table-column> -->
					
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="企事业服务情况" name="9"  >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('lingxingguomuFlyAdd',9)" icon="el-icon-plus"></el-button>
							<el-button title="修改" @click="editItem('lingxingguomuFlyAdd',9)" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" @click="delItem(5)" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData3" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column prop="GMBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="GMMC" label="果木名称	" align="center"></el-table-column>
								<el-table-column prop="GMLB_DESC" label="类别" align="center"></el-table-column>
								<el-table-column prop="DEDM_DESC" label="品种"  align="center"></el-table-column>
								<el-table-column prop="GMGG" label="规格" width="120"  align="center"></el-table-column>
								<el-table-column prop="GMSL" label="数量" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDW" label="单位" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDJ" label="单价" width="100" align="center"></el-table-column>
								<el-table-column prop="GMGJ" label="合计" width="120" align="center"></el-table-column>
								<!-- <el-table-column prop="address" label="备注" align="center"></el-table-column> -->
					
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="企事业设备" name="10"  >
						<div class="formeBody">
							<el-button size="mini" @click="addItem('lingxingguomuFlyAdd',10)" icon="el-icon-plus"></el-button>
							<el-button title="修改" @click="editItem('lingxingguomuFlyAdd',10)" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" @click="delItem(5)" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableData3" border highlight-current-row style="width: 100%" class="margin-top-m" @row-click="rowClick">
								<el-table-column prop="GMBH" label="编号"  align="center"></el-table-column>
								<el-table-column prop="GMMC" label="果木名称	" align="center"></el-table-column>
								<el-table-column prop="GMLB_DESC" label="类别" align="center"></el-table-column>
								<el-table-column prop="DEDM_DESC" label="品种"  align="center"></el-table-column>
								<el-table-column prop="GMGG" label="规格" width="120"  align="center"></el-table-column>
								<el-table-column prop="GMSL" label="数量" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDW" label="单位" width="100" align="center"></el-table-column>
								<el-table-column prop="GMDJ" label="单价" width="100" align="center"></el-table-column>
								<el-table-column prop="GMGJ" label="合计" width="120" align="center"></el-table-column>
								<!-- <el-table-column prop="address" label="备注" align="center"></el-table-column> -->
					
							</el-table>
						</div>
					</el-collapse-item>
									
				    				
				</el-collapse>

				<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " :custom-class="componentOpen+'_dialog'" v-if="showFlag">
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
		GetHouseholds,
		DelHousehold,
		AddHousehold,
		EditHousehold,
		getHousehold_Subs,
		DelHousehold_Sub
	} from '@/api';
	// import fangwuxinxiFlyAdd from '@/components/hxx/fangwuxinxi_fly_add' //房屋信息添加
	// import fushuwuFlyAdd from '@/components/hxx/fushuwu_fly_add' //附属物添加
	// import huxinxidiaochaFlyAdd from '@/components/hxx/huxinxidiaocha_fly_add' //户信息调查添加
	// import lingxingguomuFlyAdd from '@/components/hxx/lingxingguomu_fly_add' //零星果木添加
	// import renkouxinxiFlyAdd from '@/components/hxx/renkouxinxi_fly_add' //零星果木添加
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['projectNo', 'parcelId', 'Locationno', 'householdId'])
		},
		components: {
			// fangwuxinxiFlyAdd,
			// fushuwuFlyAdd,
			// huxinxidiaochaFlyAdd,
			// lingxingguomuFlyAdd,
			// renkouxinxiFlyAdd,
		},
		data() {
			return {
				ruleForm: {},
				disabled:false,
				dialogTitle: '', //弹出框标题
				dialogForm_two: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				dialogType_two: '', //弹出框操作类型
				activeFormIndex: ['1'], //当前手风琴默认打开
				tableData0: [], //户信息数据
				tableData1: [], //人口信息
				tableData2: [], //房屋信息
				tableData3: [], //附属物信息
				tableData4: [], //零星果木信息
				componentOpen: '', //当前打开添加组件名
				parcelData: [], //户信息
				ouseholdhId:'',
				loading: false,
				titleName:['企事业用地','企事业房屋及建筑物','企事业零星果木','企事业基础设施','企事业生产设施','企事业存货','企事业生产经营状况','企事业服务情况','企事业设备'],
				rules: { //约定的验证规则
					stationName: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],

				},

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
			if (this.dialogType == 'edit' ) {
				this.ruleForm = JSON.parse(JSON.stringify(this.dialogForm));
				this.$store.commit('hxx/SET_HOUSEHOLDID',this.ruleForm.KeyNo);
				// console.log(this.ruleForm)
				if(this.ruleForm.KeyNo){
					this.getHousehold_SubsInit(0);//人口信息初始化
					this.getHousehold_SubsInit(1);//房屋信息初始化
					this.getHousehold_SubsInit(2);//附属物信息初始化
					this.getHousehold_SubsInit(3);//零星果木初始化
				}
			}
			console.log(this.householdId)
			// this.GetHouseholdsInit(); //户信息数据

		},

		methods: {
			submitForm(formName) { //表单提交按钮
				var self = this;
				// self.loading = true;
				this.$refs[formName].validate((valid) => {
					// alert(1);
					var self = this;
					if (valid) {
						if(self.dialogType=='add'){
							var url = AddHousehold;
							var data = {
								ProjectNo: self.projectNo,
								id: self.parcelId,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						}else{
							var url = EditHousehold;
							var data = {
								id: self.dialogForm.KeyNo,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						}
						
						url(data).then((res) => {
							self.loading = false;
							if (self.dialogType == 'add') {
								this.$store.commit('hxx/SET_HOUSEHOLDID', res[0].Keyno)
							}
							this.disabled = true;
							this.$message({
								message: '添加户基础信息成功',
								type: 'success',
								center: true
							})
							self.getHousehold_SubsInit(0);//人口信息初始化
							self.getHousehold_SubsInit(1);//房屋信息初始化
							self.getHousehold_SubsInit(2);//附属物信息初始化
							self.getHousehold_SubsInit(3);//零星果木初始化
						}).catch((res) => {
							console.log(res)
							self.loading = false;
							this.$message({
								message: '操作失败，请确定后提交',
								type: 'error',
								center: true
							})
						})
					} else {

						// self.loading = false;
						return false;
					}
				});
				//
			},
			getHousehold_SubsInit(index){//获取人口等初始化数据
				var typeArry=['人口信息','房屋信息','附属物信息','零星果木'];
				var data={
					id:this.householdId,
					TypeName:typeArry[index],
					CurrentPage:1,
					PageSize:1000
				};
				getHousehold_Subs(data).then((res) => {
					// console.log(res, typeArry[index])
					this[`tableData${index}`]=res.list;
			
				})
				.catch((error) => {
					this[`tableData${index}`] = [];
					// console.log( this[`tableData${index}`] )
				})
				
			},
			rowClick(row, column) { //单击表格一行
				// console.log(row, column);
				this.dialogForm_two = row;
			},
			addItem(type, index) { //添加项目
				this.dialogTitle =`添加${this.titleName[index-2]}` ;
				this.componentOpen = type;
				this.dialogType_two = 'add';
				this.showFlag = true;
				this.dialogForm_two = '';
			},
			editItem(type, index) { //添加项目
				if (this.dialogForm_two) {
					this.dialogTitle =`修改${this.titleName[index-2]}` ;
					this.componentOpen = type;
					this.dialogType_two = 'edit';
					this.showFlag = true;
				} else {
					this.$message({
						message: '请选择要修改的户信息',
						type: 'warning'
					});
				}

			},
			delItem(url) {
				if (this.dialogForm_two) {
					var self = this;
					this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						center: true,
						type: 'warning'
					}).then(() => {
						DelHousehold_Sub({
							id: this.dialogForm_two.KeyNo
						}).then((res) => {
							console.log(res)
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});
							this.getHousehold_SubsInit(0);//人口信息初始化
							this.getHousehold_SubsInit(1);//房屋信息初始化
							this.getHousehold_SubsInit(2);//附属物信息初始化
							this.getHousehold_SubsInit(3);//零星果木初始化

						}).catch((res) => {
							console.log(res);
						})


					}).catch((res) => {

					})
				} else {
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
				this.getHousehold_SubsInit(0);
				this.getHousehold_SubsInit(1);
				this.getHousehold_SubsInit(2);
				this.getHousehold_SubsInit(3);

			},
			GetHouseholdsInit() {
				var data = {
					Locationno: this.Locationno,
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
 	height:70vh;
 	margin: 0%;
 	overflow-y: auto;
 	overflow-x: hidden;
 }
</style>
