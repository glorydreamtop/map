<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
							<el-row :gutter="20">
								<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="工程类型:" prop="Region">
										<el-select v-model="ruleForm.Region" filterable placeholder="请选择调查表类型" :disabled="dialogType=='look'?true:false">
											<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
											<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
											<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="区县:">
										<el-select v-model="ruleForm.County" filterable :disabled="disabled" placeholder="请选择区县" @change="change_county">
											<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
											</el-option>
										</el-select>
									</el-form-item>
									<el-form-item label="隶属关系:">
										<el-input v-model="ruleForm.Affiliation" :disabled="dialogType=='look'?true:false"></el-input>
									</el-form-item>
									<el-form-item label="其他:">
										<el-input v-model="ruleForm.Other" :disabled="dialogType=='look'?true:false"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
									<el-form-item label="高程范围:">
										<el-input v-model="ruleForm.AltitudeStart" :disabled="dialogType=='look'?true:false" style="width: 45%;"></el-input>
										<span>---</span>
										<el-input v-model="ruleForm.AltitudeEnd" :disabled="dialogType=='look'?true:false" style="width: 45%;"></el-input>
									</el-form-item>
									<el-form-item label="城市集镇:">
										<el-select v-model="ruleForm.CityTownName" filterable :disabled="disabled" placeholder="请选择区县" @change="change_town">
											<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in townData">
											</el-option>
										</el-select>

									</el-form-item>
									<el-form-item label="等级:">
										<el-input v-model="ruleForm.Grade" :disabled="dialogType=='look'?true:false"></el-input>
									</el-form-item>
								</el-col>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
									<div class="addTable border">
										<div class="tableHeader flex border-bottom">
											<span class="border-right rowWidth1">项目</span>
											<span class="border-right rowWidth2">单位</span>
											<span class="border-right rowWidth3">总计</span>
											<span class="border-right rowWidth4">征地范围内</span>
											<span class="border-right rowWidth5">备注</span>
										</div>
										<div class="tableBody">
											<div class="table_row flex border-bottom" v-for="item in peopleItem">
												<span class=" rowInput border-right rowWidth1">{{item.title}}</span>
												<span class=" rowInput border-right rowWidth2">
													<input v-model="ruleForm[item.params[0]]" :disabled="dialogType=='look'?true:false" class="border-none" />
												</span>
												<span class=" rowInput border-right rowWidth3">
													<input v-model="ruleForm[item.params[1]]" :disabled="dialogType=='look'?true:false" class="border-none" />
												</span>
												<span class=" rowInput border-right rowWidth4">
													<input v-model="ruleForm[item.params[2]]" :disabled="dialogType=='look'?true:false" class="border-none" />
												</span>
												<span class=" rowInput border-right rowWidth5">
													<input v-model="ruleForm[item.params[3]]" :disabled="dialogType=='look'?true:false" class="border-none" />
												</span>
											</div>
									
									
										</div>
									</div>
																
								</el-col>
							</el-row>
						
						</el-form>
						<div class="dialog_foot margin-top-l" v-show="dialogType!='look'&&!disabled">
							<span class="btn_foot">
								<el-button class="button-l" type="primary" @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
							</span>
						</div>
					</el-collapse-item>
					<el-collapse-item title="基础设施调查表" name="2" v-if="KeyNo">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(1)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(1)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(1)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="tableItemData" highlight-current-row border style="width: 100%" class="margin-top-m" @row-click="rowClick"
							 :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value">
								<el-table-column prop="value" label="编号" width="150" align="center"></el-table-column>
								<el-table-column prop="label" label="项目名称" width="180" align="center"></el-table-column>
								<el-table-column prop="Unit" label="单位" width="130" align="center"></el-table-column>
								<el-table-column prop="AttrNum" label="数量" align="center"></el-table-column>
								<!-- <el-table-column prop="Remarks" label="备注" align="center"></el-table-column> -->
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="防洪(其他)设施调查表" name="3" v-if="KeyNo">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem(2)" icon="al-icon-tianjia"></el-button>
							<el-button title="修改" @click="editTableItem(2)" size="mini" icon="al-icon-xiugai" ></el-button>
							<el-button title="删除" @click="delTableItem(2)" size="mini" icon="al-icon-shanchu" ></el-button>
							<el-table :data="tableItemData_else" highlight-current-row border style="width: 100%" @row-click="rowClick"
							 class="margin-top-m" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value">
								<el-table-column prop="value" label="编号" width="150" align="center"></el-table-column>
								<el-table-column prop="label" label="项目名称" width="180" align="center"></el-table-column>
								<el-table-column prop="Content" label="内容" align="center"></el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="相关文档" name="4" v-if="KeyNo">

						<files :id="KeyNo" />
					</el-collapse-item>

				</el-collapse>

			</div>
		</div>
		<el-dialog :title="flyTitle" :append-to-body="true" @close="closeDialog" :visible.sync="showFlag" v-model="showFlag"
		 class="newStyleDialog " center :custom-class="`cityTownAdd_dialog${flyIndex}`">
			<component :is="`itemAdd${flyIndex}`" :dialog-type="flyType" :dialog-table="flyIndex==1?tableItemData:tableItemData_else"
			 v-on:showStudes="showStudescode" :dialog-form="flyForm" v-if="showFlag"></component>

		</el-dialog>
	</div>
</template>

<script>
	import itemAdd1 from './cityTown_item_add'
	import itemAdd2 from './cityTown_item2_add'
	import files from "@/components/files"
	import {
		mapGetters
	} from 'vuex'
	import {
		GetLocations,
		UpdateBaseTablesBaseAttrs,
		GetBaseTablesListAttrs,
		AddBaseTablesBaseAttrs,
		GetJBQKDCBItems,
		GetSerialNumber,
		DeleteBaseTablesAttr
	} from '@/api'
	export default {
		name: 'jbqk_table1_add',
		components: {
			itemAdd2,
			itemAdd1,
			files
		},
		computed: {
			...mapGetters(['projectNo', 'BaseType', 'KeyNo'])
		},
		data: function() {
			return {
				activeFormIndex: '1',
				countyData: [], //区县集合
				townData: [], //城镇集合
				ruleForm: {
					PopulationUnit:'人',
					ResidentUnit:'人',
					NotRegisteredUnit:'人',
					CommuterUnit:'人',
					MobileUnti:'人',
					TownPlanningAreaUnit:'h㎡或㎡',
					BuiltUpAreaUnit:'h㎡或㎡',
					DevelopmentPlanUnit:'h㎡或㎡',
					VillagersCommitteeUnit:'个',
					VillagerGroupUnit:'个',
					AdministrativeUnit:'个',
					PublicInstitutionsUnit:'个',
					EnterpriseUnit:'个',
					SelfEmployedUnit:'个',

					
				},
				tableItemData: [],
				tableItemData_else: [],
				peopleItem: [{
						title: '总人口规模',
						params: ['PopulationUnit', 'PopulationTotal', 'PopulationLandRange', 'PopulationRemarks']

					},
					{
						title: '常驻人口',
						unit: '人',
						params: ['ResidentUnit', 'ResidentTotal', 'ResidentLandRange', 'ResidentRemarks']
					},
					{
						title: '无户籍常住人口',
						unit: '人',
						params: ['NotRegisteredUnit', 'NotRegisteredTotal', 'NotRegisteredLandRange', 'NotRegisteredRemarks']
					},
					{
						title: '通勤人口',
						unit: '人',
						params: ['CommuterUnit', 'CommuterTotal', 'CommuterLandRange', 'CommuterRemarks']
					},
					{
						title: '流动人口',
						unit: '人',
						params: ['MobileUnti', 'MobileTotal', 'MobileLandRange', 'MobileRemarks']
					},
					{
						title: '城镇规划区总总用地面积',
						unit: 'hm²或m²',
						params: ['TownPlanningAreaUnit', 'TownPlanningAreaTotal', 'TownPlanningAreaLandRange',
							'TownPlanningAreaRemarks'
						]
					},
					{
						title: '建成区总用地面积',
						unit: 'hm²或m²',
						params: ['BuiltUpAreaUnit', 'BuiltUpAreaTotal', 'BuiltUpAreaLandRange', 'BuiltUpAreaRemarks']
					},
					{
						title: '发展规划用地',
						unit: 'hm²或m²',
						params: ['DevelopmentPlanUnit', 'DevelopmentPlanTotal', 'DevelopmentPlanLandRange', 'DevelopmentPlanRemarks']
					},
					{
						title: '村民委（街道办）',
						unit: '个',
						params: ['VillagersCommitteeUnit', 'VillagersCommitteeTotal', 'VillagersCommitteeLandRange',
							'VillagersCommitteeRemarks'
						]
					},
					{
						title: '村民组（社区）',
						unit: '个',
						params: ['VillagerGroupUnit', 'VillagerGroupTotal', 'VillagerGroupLandRange', 'VillagerGroupRemarks']
					},
					{
						title: '行政单位',
						unit: '个',
						params: ['AdministrativeUnit', 'AdministrativeTotal', 'AdministrativeLandRange', 'AdministrativeRemarks']
					},
					{
						title: '事业单位',
						unit: '个',
						params: ['PublicInstitutionsUnit', 'PublicInstitutionsTotal', 'PublicInstitutionsLandRange',
							'PublicInstitutionsRemarks'
						]
					},
					{
						title: '企业单位',
						unit: '个',
						params: ['EnterpriseUnit', 'EnterpriseTotal', 'EnterpriseLandRange', 'EnterpriseRemarks']
					},
					{
						title: '个体工商户',
						unit: '个',
						params: ['SelfEmployedUnit', 'SelfEmployedTotal', 'SelfEmployedLandRange', 'SelfEmployedRemarks']
					},
				],
				seenButton: false,
				currentIndex: 0,
				tableData: [],
				submitLoad: false,
				disabled: false,
				showFlag: false,
				rules: { //约定的验证规则
					stationName: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],

				},
				flyType: '',
				flyForm: '',
				flyTitle: '',
				flyIndex: '',

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
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				if (this.dialogType == 'look') {
					this.disabled = true;
				}
				this.ruleForm = this.dialogForm;
				this.$store.commit('jbqk/set_KeyNo', this.dialogForm.KeyNo)
				this.$store.commit('jbqk/set_KeyNo', this.dialogForm.KeyNo)
				this.GetLocationInit(0, 'countyData'); //获取区县
				this.GetLocationInit(this.dialogForm.County, 'townData'); //获取乡镇
				this.GetJBQKDCBItemInit(); //获取数据项
			} else {
				this.GetLocationInit(0, 'countyData'); //获取地区
			}

		},

		methods: {
			addTableItem(index) { //添加
				var title = ['添加设施调查表', '添加防洪其他调查表'];
				this.flyIndex = index;
				this.flyTitle = title[index - 1];
				this.showFlag = true;
				this.flyType = 'add';
				this.flyForm = '';
			},
			rowClick(row, column) { //单击表格一行
				console.log(row, column);
				if (row.ClassName == "singleitem") {
					this.flyForm = row;

				}
			},
			editTableItem(index) { //修改
				var title = ['修改设施调查表', '修改防洪其他调查表'];
				if (this.flyForm) {
					this.flyIndex = index;
					this.showFlag = true;
					this.flyTitle = title[index - 1];
					this.flyType = 'edit';
				} else {
					this.$message({
						message: '请选择要编辑的数据项',
						type: 'error',
						center: true
					})
				}
			},

			delTableItem(index) { //删除
				if (this.flyForm) {
					var self = this;
					this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						center: true,
						type: 'warning'
					}).then(() => {
						DeleteBaseTablesAttr({
							id: this.flyForm.KeyNo
						}).then((res) => {
							console.log(res)
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true
							});
							self.GetJBQKDCBItemInit();

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
				this.GetJBQKDCBItemInit();
			},
			showStudescode(data) { //监听弹出框是关还是闭
				this.showFlag = data;
				this.GetJBQKDCBItemInit();

			},
			GetLocationInit(id, type) {
				var data = {
					Locationno: id,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
						this[type] = res;
					})
					.catch((error) => {
						this[type] = [];
						console.log(error)
					})
			},
			GetJBQKDCBItemInit() { //获取数据项
				console.log(this.KeyNo)
				var data = {
					id: this.KeyNo
				};
				var elseData = [];
				var newData = [];
				GetBaseTablesListAttrs(data).then((res) => {
						for (var i in res) {
							if (res[i].label == "防洪设施调查" || res[i].label == "其他调查") {
								elseData.push(res[i]);

							} else {
								newData.push(res[i]);
							}
						}
						this.tableItemData = newData;
						this.tableItemData_else = elseData;
						console.log(elseData, newData, '获取数据项')
					})
					.catch((error) => {
						this.tableItemData = [];
						console.log(error)
					})
			},

			change_county(data) { //选中区县,获取乡镇
				for (var i = 0; i < this.countyData.length; i++) {
					if (data == this.countyData[i].o_locationno) {
						this.ruleForm.CountyDESC = this.countyData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data, 'townData'); //获取乡镇
			},
			change_town(data) { //选中乡镇,获取村委
				for (var i = 0; i < this.townData.length; i++) {
					if (data == this.townData[i].o_locationno) {
						this.ruleForm.CityTownName = this.townData[i].o_locationdesc;
					}
				}
			},
			submitForm(formName) { //表单提交按钮
				this.$refs[formName].validate((valid) => {
					var self = this;
					console.log(self.ruleForm);
					return;
					if (valid) {
						this.submitLoad = true;
						if (self.dialogType == 'add') { //添加时候先获取编号
							var url = AddBaseTablesBaseAttrs;
							var data = {
								ProjectNo: self.projectNo,
								BaseType: this.BaseType,
								id: self.ruleForm.County,
								JsonStr: JSON.stringify(self.ruleForm)
							};
						} else {
							var url = UpdateBaseTablesBaseAttrs;
							var data = {
								id: self.KeyNo,
								JsonStr: JSON.stringify(self.ruleForm)
							};
						}
						url(data).then((res) => {
							this.submitLoad = false;
							if (self.dialogType == 'add') {
								this.KeyNo = res[0].Keyno;
								this.$store.commit('jbqk/set_KeyNo', res[0].Keyno)
							}
							this.disabled = true;
							this.$message({
								message: '添加表基础信息成功',
								type: 'success',
								center: true
							})
						}).catch((res) => {
							console.log(res)
							this.submitLoad = false;

						})
					} else {

						// self.loading = false;
						return false;
					}
				});
			},

		}
	}
</script>
<style scoped="scoped">
	.reyuan_form {
		height: 70vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}

	.rowWidth1 {
		width: 30%;
	}

	.rowWidth2 {
		width: 10%;
	}

	.rowWidth3 {
		width: 15%;
	}

	.rowWidth4 {
		width: 20%;
	}

	.rowWidth5 {
		width: 25%;
	}

	.table_row:last-child {
		border-bottom: none;
	}

	.rowInput {
		display: inline-block;
		text-align: center;
	}

	.tableHeader span {
		display: inline-block;
		text-align: center;
	}

	.tableHeader span:last-child,
	.rowInput:last-child {
		border-right: none;
	}

	.rowInput input {
		width: 90%;
		display: inline-block;
		height: 4vh;
		border: none;
		outline: none;
		background: #233b5000;
		color: $white;
		text-align: center;


	}
</style>
