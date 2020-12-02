<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<div class="formeHeader">
							<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
								<el-form-item label="地区类型:" prop="Region">
									<el-select v-model="ruleForm.Region" filterable placeholder="请选择地区类型" @change="change_tableType" class="input-200">
										<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
										<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
										<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="区县:" prop="stationName">
									<el-select v-model="ruleForm.County" filterable placeholder="请选择区县" @change="change_county" class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
										</el-option>
									</el-select>

								</el-form-item>

								<el-form-item label="乡镇:" prop="stationName">
									<el-select v-model="ruleForm.Town" filterable placeholder="请选择区县" @change="change_town" class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in townData">
										</el-option>
									</el-select>

								</el-form-item>
								<el-form-item label="村民委:" prop="stationName">
									<el-select v-model="ruleForm.Village" filterable placeholder="请选择区县" @change="change_village" class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in villageData">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="村民小组:" prop="stationName">
									<el-select v-model="ruleForm.VillageGroup" filterable placeholder="请选择区县" @change="change_village" class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in villageGroupData">
										</el-option>
									</el-select>
								</el-form-item>
				
							</el-form>
							<div class="dialog_foot" v-show="dialogType!='look'">
								<span class="btn_foot">
									<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="loading">{{loading===false?'提交':'提交中'}}</el-button>
								</span>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item title="表数据信息" name="2">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableItemData" highlight-current-row border style="width: 100%" class="margin-top-m">
								<el-table-column prop="value" label="编号" width="80" align="center"></el-table-column>
								<el-table-column prop="label" label="项目" width="180" align="center"></el-table-column>
								<el-table-column prop="unit" label="单位" width="80" align="center"></el-table-column>
								<el-table-column prop="length" label="数量" width="80" align="center"></el-table-column>
								<el-table-column prop="address" label="备注" align="center"></el-table-column>

							</el-table>
						</div>


					</el-collapse-item>
				</el-collapse>

				<el-dialog :title="dialogTitle" :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " custom-class="jbqk_add2_table1_dialog">
					<jbFlyAddTwo :dialog-type="dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></jbFlyAddTwo>
				</el-dialog>
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
		GetJBQKDCBItems,
		GetSerialNumber
	} from '@/api'
	import jbFlyAddTwo from '@/components/jbqkTablePage/jbqk_fly_table1_add_two' //打开农村数据表格项内容
	export default {
		name: 'jbqk_table1_add_two',
		components: {
			jbFlyAddTwo
		},
		data() {
			return {
				Locationno: 0,
				BaseType: 'NONGCUN',
				countyData: [], //区县数据
				townData: [], //城镇数据
				villageData: [], //村庄数据
				villageGroupData:[],//村庄小组
				dialogTitle: '', //弹出框标题
				fly2_dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				fly2_dialogType: '', //弹出框操作类型
				activeFormIndex: ['1'], //当前手风琴默认打开
				ruleForm: {
					SerialNumber:'',
					County: '',
					Town: '',
					Village:'',
					VillageGroup:'',
					Region:'',
				},
				tableItemData: [], //数据项列表数据
				tableData: [],
				loading: false,
				disabled: false,
				rules: { //约定的验证规则
					Region: [{
						required: true,
						message: '请选择区县',
						trigger: 'change'
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
		computed: {
			...mapGetters(['projectNo'])
		},
		props: ['dialogType', 'dialogForm'],
		mounted() {},
		created() {
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				// this.dialogForm.sysName=[];
				this.disabled = true;
			}
			// console.log(this.projectNo, '获取编码，这是初始化内容')
			this.GetLocationInit(); //获取地区
			this.GetJBQKDCBItemInit(); //获取数据项

		},

		methods: {
			GetJBQKDCBItemInit() {//获取数据项
				var data = {
					BaseType: this.BaseType,
					ProjectNo: this.projectNo
				};
				GetJBQKDCBItems(data).then((res) => {
						console.log(res, '获取数据项')
						this.tableItemData=res;
						// this.tableData = res;
					})
					.catch((error) => {
						this.tableData = [];
						console.log(error)
					})
			},
			change_county(data) {//选中区县,获取乡镇
				this.Locationno = data;
				var data = {
					Locationno: this.Locationno,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
						this.townData = res;
					})
					.catch((error) => {
						this.townData = [];
					})
			},
			change_town(data) {//选中乡镇,获取村委
				this.Locationno = data;
				var data = {
					Locationno: this.Locationno,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
						this.villageData = res;
					})
					.catch((error) => {
						this.villageData = [];
					})
			},
			change_village(data){//选中村委,获取村委组
				this.Locationno = data;
				var data = {
					Locationno: this.Locationno,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
						this.villageGroupData = res;
					})
					.catch((error) => {
						this.villageGroupData = [];
					})
			},
			GetLocationInit() {
				var data = {
					Locationno: this.Locationno,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
						this.countyData = res;
					})
					.catch((error) => {
						this.tableData = [];
						console.log(error)
					})
			},
			GetSerialNumberInit(){//添加时候获取编号
			   var data = {
			   	BaseType: this.BaseType	,
			   	id: this.ruleForm.Village,
				Code:'',
			   };
				GetSerialNumber(data).then((res) => {
						console.log(res);
					})
					.catch((error) => {
						this.tableData = [];
						console.log(error)
					})
			},
			change_tableType(data) { //选择表类型

			},
			addTableItem() { //添加项目
				this.fly2_dialogForm = '';
				this.dialogTitle = '添加农村信息数据项';
				this.fly2_dialogType = 'add';
				this.showFlag = true;
			},
			closeDialog() { //关闭弹出框

			},
			showStudescode(data) { //监听弹出框是关还是闭

			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				// self.loading = true;
				this.$refs[formName].validate((valid) => {
					// alert(1);
					var self = this;
					if (valid) {
                        
							if (self.dialogType == 'add') {//添加时候先获取编号
								this.GetSerialNumberInit();
							} else {
								// var url = exchStationAdd;
							}
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
		height: 650px;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
