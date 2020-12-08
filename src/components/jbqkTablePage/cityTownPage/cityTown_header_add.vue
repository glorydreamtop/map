<template>
	<div id="element_add">
		<!--员工弹出框-->
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
							<el-form-item label="地区类型:" prop="Region">
								<el-select v-model="ruleForm.Region" filterable placeholder="请选择调查表类型" class="input-200" :disabled="dialogType=='look'?true:false">
									<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
									<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
									<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="高程范围:">
								<el-input v-model="ruleForm.AltitudeStart" :disabled="dialogType=='look'?true:false" class="input-90"></el-input>
								<span>---</span>
								<el-input v-model="ruleForm.AltitudeEnd" :disabled="dialogType=='look'?true:false" class="input-90"></el-input>
							</el-form-item>
							<el-form-item label="区县:" >
								<el-select v-model="ruleForm.County" filterable :disabled="disabled" placeholder="请选择区县" @change="change_county"
								 class="input-200">
									<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
									</el-option>
								</el-select>
							</el-form-item>

							<el-form-item label="城市集镇:" >
								<el-select v-model="ruleForm.CityTownName" filterable :disabled="disabled" placeholder="请选择区县" @change="change_town"
								 class="input-200">
									<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in townData">
									</el-option>
								</el-select>

							</el-form-item>
							<el-form-item label="隶属关系:" >
								<el-input v-model="ruleForm.Affiliation" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
							</el-form-item>
							<el-form-item label="等级:" >
								<el-input v-model="ruleForm.Grade" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
							</el-form-item>
							<el-form-item label="其他:">
								<el-input v-model="ruleForm.Other" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
							</el-form-item>
							<div>
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
							</div>
						</el-form>
                        <div class="dialog_foot margin-top-l" v-show="dialogType!='look'&&!disabled">
                        	<span class="btn_foot">
                        		<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
                        	</span>
                        </div>
					</el-collapse-item>
					<el-collapse-item title="设施调查表" name="2">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableItemData" highlight-current-row border style="width: 100%" class="margin-top-m">
								<el-table-column prop="code" label="编号" width="80" align="center"></el-table-column>
								<el-table-column prop="name" label="项目名称" width="180" align="center"></el-table-column>
								<el-table-column prop="unit" label="单位" width="130" align="center"></el-table-column>
								<el-table-column prop="length" label="数量" width="130" align="center"></el-table-column>
								<el-table-column prop="address" label="备注" align="center"></el-table-column>

							</el-table>
						</div>
					</el-collapse-item>
					<el-collapse-item title="防洪(其他)设施调查表" name="3">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableItemData" highlight-current-row border style="width: 100%" class="margin-top-m">
								<el-table-column prop="code" label="编号" width="80" align="center"></el-table-column>
								<el-table-column prop="name" label="项目名称" width="180" align="center"></el-table-column>
								<el-table-column prop="unit" label="内容" width="130" align="center"></el-table-column>
								<!-- <el-table-column prop="address" label="备注" align="center"></el-table-column> -->

							</el-table>
						</div>
					</el-collapse-item>
					
				</el-collapse>

			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		GetLocations,
		UpdateBaseTablesBaseAttrs,
		GetBaseTablesListAttrs,
		AddBaseTablesBaseAttrs,
		GetJBQKDCBItems,
		GetSerialNumber
	} from '@/api'
	export default {
		name: 'jbqk_table1_add',
		computed: {
			...mapGetters(['projectNo','BaseType'])
		},
		data: function() {
			return {
				activeFormIndex: '1',
				countyData: [], //区县集合
				townData: [], //城镇集合
				ruleForm: {},
				tableItemData: [],
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
						params: ['NotRegisteredUnit	', 'NotRegisteredTotal', 'NotRegisteredLandRange', 'NotRegisteredRemarks']
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
		components: {},
		props: ['dialogType', 'dialogForm'],
		mounted: function() {
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				if (this.dialogType == 'look') {
					this.disabled = true;
				}
				this.ruleForm = this.dialogForm;
				this.KeyNo_new = this.dialogForm.KeyNo;
				this.$store.commit('jbqk/set_KeyNo', this.dialogForm.KeyNo)
				this.GetLocationInit(0, 'countyData'); //获取区县
				this.GetLocationInit(this.dialogForm.County, 'townData'); //获取乡镇
				this.GetJBQKDCBItemInit(); //获取数据项
			} else {
				this.GetLocationInit(0, 'countyData'); //获取地区
			}

		},

		methods: {
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
			GetJBQKDCBItemInit() {//获取数据项
			    console.log(this.KeyNo)
				var data = {id: this.KeyNo};
				GetBaseTablesListAttrs(data).then((res) => {
						 this.tableItemData =res;
						 console.log(res, this.tableItemData, '获取数据项')
				})
				.catch((error) => {
					this.tableItemData = [];
					console.log(error)
				})
			},
			addTableItem() {

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
					if (valid) {
						this.submitLoad=true;
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
								id: self.KeyNo_new,
								JsonStr: JSON.stringify(self.ruleForm)
							};
						}
						url(data).then((res) => {
							this.submitLoad=false;
							if (self.dialogType == 'add') {
								this.KeyNo_new = res[0].Keyno;
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
							this.submitLoad=false;
				
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
