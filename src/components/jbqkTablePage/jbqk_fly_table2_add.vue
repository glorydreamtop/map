<template>
	<div id="element_add">
		<!--员工弹出框-->
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
							<el-form-item label="地区类型:" prop="stationName">
								<el-select v-model="ruleForm.tableIndex" filterable placeholder="请选择调查表类型" @change="change_tableType" style="width:200px">
									<el-option key="1" label="水库淹没区" value="1"></el-option>
									<el-option key="2" label="水库影响区" value="2"></el-option>
									<el-option key="3" label="枢纽工程建设区" value="3"></el-option>
								</el-select>
							</el-form-item>
							<el-form-item label="地区:" prop="stationName">
								<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" style="width:200px"></el-input>
							</el-form-item>

							<el-form-item label="城市集镇名称:" prop="stationName">
								<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" style="width:200px"></el-input>
							</el-form-item>
							<el-form-item label="隶属关系:" prop="stationName">
								<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" style="width:200px"></el-input>
							</el-form-item>
							<el-form-item label="等级:" prop="stationName">
								<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" style="width:200px"></el-input>
							</el-form-item>
							<el-form-item label="其他:" prop="stationName">
								<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" style="width:200px"></el-input>
							</el-form-item>
							<div >	
								<div class="addTable border">
									<div class="tableHeader border-bottom">
										<span style="width: 30%;" class="border-right">项目</span>
										<span style="width: 10%;" class="border-right">单位</span>
										<span style="width: 15%;" class="border-right">总计</span>
										<span style="width: 20%;" class="border-right">征地范围内</span>
										<span style="width: 25%;" class="border-right">备注</span>
									</div>
									<div class="tableBody">
										<div class="table_row border-bottom" v-for="item in peopleItem">
											<span class=" rowInput border-right" style="width: 30%;">{{item.title}}</span>
											<span class=" rowInput border-right" style="width: 10%;">{{item.unit}}</span>
											<span class=" rowInput border-right" style="width: 15%;">
												<input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="border-none"/>
											</span>
											<span class=" rowInput border-right" style="width: 20%;">
												<input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="border-none"/>
											</span>
											<span class=" rowInput border-right" style="width: 25%;">
												<input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="border-none"/>
											</span>
										</div>	
									</div>
								</div>	
							</div>
						</el-form>



					</el-collapse-item>
				</el-collapse>
				<!-- <el-form :inline="true"  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-form-item label="地区类型:" prop="stationName">
						<el-select v-model="ruleForm.tableIndex" filterable placeholder="请选择调查表类型" @change="change_tableType">
							<el-option key="1" label="水库淹没区" value="1"></el-option>
							<el-option key="2" label="水库影响区" value="2"></el-option>
							<el-option key="3" label="枢纽工程建设区" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="地区:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>

					<el-form-item label="城市集镇名称:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="隶属关系:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="等级:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="其他:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="基本情况调查:">
						
				<div class="addTable border">
					<div class="tableHeader border-bottom">
						<span style="width: 30%;" class="border-right">项目</span>
						<span style="width: 10%;" class="border-right">单位</span>
						<span style="width: 15%;" class="border-right">总计</span>
						<span style="width: 20%;" class="border-right">征地范围内</span>
						<span style="width: 25%;" class="border-right">备注</span>
					</div>
					<div class="tableBody">
						<div class="table_row border-bottom" v-for="item in peopleItem">
							<span class=" rowInput border-right" style="width: 30%;">{{item.title}}</span>
							<span class=" rowInput border-right" style="width: 10%;">{{item.unit}}</span>
							<span class=" rowInput border-right" style="width: 15%;"></span>
							<span class=" rowInput border-right" style="width: 20%;"></span>
							<span class=" rowInput border-right" style="width: 25%;"></span>
						</div>

					</div>
				</div>
				</el-form-item>
				<el-form-item label="市政基础设施调查:">
					<el-button size="mini" @click="addTableItem">添加</el-button>
					<div class="addTable border" v-if="ruleForm.itemList.length!=0">
						<div class="tableHeader border-bottom">
							<span style="width: 30%;" class="border-right">项目</span>
							<span style="width: 30%;" class="border-right">单位</span>
							<span style="width: 40%;" class="border-right">备注</span>
						</div>
						<div class="tableBody">
							<div class="table_row border-bottom" v-for="(item,index) in ruleForm.itemList">
								<span style="width: 30%;position: relative;" class="rowInput border-right" @mouseenter="mouseEnter(index)"
								 @mouseleave="mouseLeave(index)">
									<input v-model="item.itemName" />
									<i class="el-icon-close shopClose" @click="delShopItem(index,item)" v-show="seenButton&&currentIndex==index"></i>
								</span>
								<span style="width: 30%;" class=" rowInput border-right">
									<input v-model="item.unit" />
								</span>
								<span style="width: 40%;" class="rowInput border-right">
									<input v-model="item.remark" />
								</span>
							</div>
						</div>
					</div>
				</el-form-item>

				</el-form>

				-->
			</div>
			<div class="dialog_foot" v-show="dialogType!='look'">
				<span class="btn_foot">
					<el-button class="bulueBTn" @click="submitForm2('ruleForm')" :loading="loading">{{loading===false?'提交':'提交中'}}</el-button>
				</span>
			</div>
		</div>
	</div>
</template>

<script>
	// import axios from 'axios'
	export default {
		name: 'jbqk_table1_add',
		data: function() {
			return {
				activeFormIndex: '1',
				ruleForm: {
					tableIndex: '1',
					adress: '',
					area: '',
					heatLineId: "",
					heatingMode: '',
					joinTime: '',
					latitude: '',
					longitude: '',
					phone: '',
					size: "",
					stationName: '',
					cityId: '',
					stationCode: '',
					sysCount: 1,
					sysName: ["系统1"],
					distance: '',
					itemList: [],

				},
				peopleItem: [{
						title: '总人口规模',
						unit: '人'
					},
					{
						title: '常驻人口',
						unit: '人'
					},
					{
						title: '无户籍常住人口',
						unit: '人'
					},
					{
						title: '通勤人口',
						unit: '人'
					},
					{
						title: '流动人口',
						unit: '人'
					},
					{
						title: '城镇规划区总总用地面积',
						unit: 'hm²或m²'
					},
					{
						title: '建成区总用地面积',
						unit: 'hm²或m²'
					},
					{
						title: '发展规划用地',
						unit: 'hm²或m²'
					},
					{
						title: '村民委（街道办）',
						unit: '个'
					},
					{
						title: '村民组（社区）',
						unit: '个'
					},
					{
						title: '行政单位',
						unit: '个'
					},
					{
						title: '事业单位',
						unit: '个'
					},
					{
						title: '企业单位',
						unit: '个'
					},
					{
						title: '个体工商户',
						unit: '个'
					},
				],
				seenButton: false,
				currentIndex: 0,
				tableData: [],
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					stationName: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],
					heatMethod: [{
						required: true,
						message: '请选择供热类型',
						trigger: 'change'
					}, ],
					stationCode: [{
						required: true,
						message: '请填写编号',
						trigger: 'blur'
					}, ],
					heatLineId: [{
						required: true,
						message: '请选择线别',
						trigger: 'blur'
					}, ],
					cityId: [{
						required: true,
						message: '请选择城市代码',
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
				// this.dialogForm.sysName=[];
				this.disabled = true;
			}

		},

		methods: {
			change_tableType(data) { //选择表类型

			},
			addTableItem() { //添加项目
				this.ruleForm.itemList.push({
					itemName: '',
					unit: '',
					remark: ''
				})
			},
			delShopItem(index, item) { //删除项目
				this.ruleForm.itemList.splice((index), 1);
			},
			mouseEnter(index) { //移入
				console.log('移入')
				this.seenButton = true;
				this.currentIndex = index;
			},
			mouseLeave(index) { //移出
				console.log('移出')
				this.seenButton = false;
				this.currentIndex = index;
			},
			submitForm2(formName) { //表单提交按钮
				var self = this;
				// self.loading = true;
				this.$refs[formName].validate((valid) => {
					// alert(1);
					var self = this;
					if (valid) {

						// 						if (self.dialogType == 'edit') {
						// 							var url = exchStationEdit;
						// 						} else {
						// 							var url = exchStationAdd;
						// 						}
						// 						//
						// 						url(self.ruleForm).then((res) => {
						// 							console.log(res, self.ruleForm);
						// 							if (res.data.status == 200 || res.data.status == 0) {
						// 								self.loading = false;
						// 								self.$emit('showStudes', false);
						// 								self.$message({
						// 									message: '操作成功',
						// 									type: 'success',
						// 									center: true,
						// 
						// 								});
						// 
						// 							} else {
						// 								self.loading = false;
						// 								this.$message({
						// 									message: '操作失败:' + res.data.message,
						// 									type: 'warning',
						// 									center: true
						// 								});
						// 
						// 							}
						// 						}).catch((res) => {
						// 							self.loading = false;
						// 							this.$message({
						// 								message: '操作失败，请确定后提交',
						// 								type: 'error',
						// 								center: true
						// 							})
						// 						})
					} else {

						// self.loading = false;
						return false;
					}
				});
				//
			},

		}
	}
</script>
<style scoped="scoped">
	.reyuan_form {
		height: 65vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}

	.addTable {
		color: $white;
	}

	.tableHeader,
	.table_row {
		display: flex;
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

	.tableHeader span:last-child {
		border-right: none;
	}

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
