<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<div class="formeHeader">
							<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
								<el-form-item label="地区类型:" prop="Region">
									<el-select v-model="ruleForm.Region" filterable :disabled="disabled" placeholder="请选择地区类型" 
									 class="input-200">
										<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
										<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
										<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="区县:" prop="stationName">
									<el-select v-model="ruleForm.County" filterable :disabled="disabled" placeholder="请选择区县" @change="change_county"
									 class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
										</el-option>
									</el-select>
								</el-form-item>

								<el-form-item label="乡镇:" prop="stationName">
									<el-select v-model="ruleForm.Town" filterable :disabled="disabled" placeholder="请选择区县" @change="change_town"
									 class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in townData">
										</el-option>
									</el-select>

								</el-form-item>
								<el-form-item label="村民委:" prop="stationName">
									<el-select v-model="ruleForm.Village" filterable :disabled="disabled" placeholder="请选择区县" @change="change_village"
									 class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in villageData">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="村民小组:" prop="stationName">
									<el-select v-model="ruleForm.VillageGroup" filterable :disabled="disabled" placeholder="请选择区县" @change="change_VillageGroup"
									 class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in villageGroupData">
										</el-option>
									</el-select>
								</el-form-item>

							</el-form>
							<div class="dialog_foot" v-show="dialogType!='look'&&!disabled">
								<span class="btn_foot">
									<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
								</span>
							</div>
						</div>
					</el-collapse-item>
					<el-collapse-item title="表数据信息" name="2" v-if="KeyNo">
						<div class="formeBody">
							<el-button size="mini" @click="addTableItem" icon="el-icon-plus"></el-button>
							<el-button title="修改" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableItemData" highlight-current-row border style="width: 100%" class="margin-top-m" height="25vh"
							 :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all>
								<el-table-column prop="value" label="编号" align="left"></el-table-column>
								<el-table-column prop="label" label="项目" width="180" align="center"></el-table-column>
								<el-table-column prop="unit" label="单位" width="80" align="center"></el-table-column>
								<el-table-column prop="length" label="数量" width="80" align="center"></el-table-column>
								<el-table-column prop="address" label="备注" align="center"></el-table-column>

							</el-table>
						</div>


					</el-collapse-item>
				</el-collapse>

				<el-dialog :title="dialogTitle"  :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " custom-class="jbqk_add2_table1_dialog">
					<villageHeaderAdd :dialog-type="fly2_dialogType" v-on:showStudes="showStudescode" :dialog-form="dialogForm" v-if="showFlag"></villageHeaderAdd>
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
		UpdateBaseTablesBaseAttrs,
		GetBaseTablesListAttrs,
		AddBaseTablesBaseAttrs,
		GetJBQKDCBItems,
		GetSerialNumber
	} from '@/api'
	import villageHeaderAdd from '@/components/jbqkTablePage/villagePage/village_item_add' 
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['projectNo','BaseType','KeyNo'])
		},
		components: {
			villageHeaderAdd
		},
		data() {
			return {
				countyData: [], //区县数据
				townData: [], //城镇数据
				villageData: [], //村庄数据
				villageGroupData: [], //村庄小组
				dialogTitle: '', //弹出框标题
				fly2_dialogForm: "", //弹出框表单
				showFlag: false, //弹出框显隐状态
				fly2_dialogType: '', //弹出框操作类型
				activeFormIndex: ['1'], //当前手风琴默认打开
				ruleForm: {
					County: '',
					Town: '',
					Village: '',
					VillageGroup: '',
					Region: '',

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
				tableLoad:false,
				submitLoad:false,

			}
		},
		props: ['dialogType', 'dialogForm'],
		mounted() {
			console.log(this.dialogForm, '传参')
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				if (this.dialogType == 'look') {
					this.disabled = true;
				}
				this.ruleForm = this.dialogForm;
				this.$store.commit('jbqk/set_KeyNo', this.dialogForm.KeyNo)
				this.GetLocationInit(0, 'countyData'); //获取区县
				this.GetLocationInit(this.dialogForm.County, 'townData'); //获取乡镇
				this.GetLocationInit(this.dialogForm.Town, 'villageData'); //获取村委
				this.GetLocationInit(this.dialogForm.Village, 'villageGroupData'); //获取村委组
				this.GetJBQKDCBItemInit(); //获取数据项
			} else {
				this.$store.commit('jbqk/set_KeyNo', '')
				this.GetLocationInit(0, 'countyData'); //获取地区
			}
			// this.GetJBQKDCBItemsInit();
		},
		created() {},

		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				// console.log(row, rowIndex);
				// if (rowIndex === 1) {
				//   return 'warning-row';
				// } else if (rowIndex === 3) {
				//   return 'success-row';
				// }
				// return '';
			},

			GetJBQKDCBItemInit() {//获取数据项
			    console.log(this.KeyNo)
				var data = {id: this.KeyNo};
				GetBaseTablesListAttrs(data).then((res) => {
						 this.tableItemData = listToTree(res, 'VirtualitemName', 'ParentVirtualitemName');
						 console.log(res, this.tableItemData, '获取数据项')
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
						this.ruleForm.TownDESC = this.townData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data, 'villageData'); //获取村委
			},
			change_village(data) { //选中村委,获取村委组
				for (var i = 0; i < this.villageData.length; i++) {
					if (data == this.villageData[i].o_locationno) {
						this.ruleForm.VillageDESC = this.villageData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data, 'villageGroupData'); //获取村委组
			},
			change_VillageGroup(data) { //选中村委组
				for (var i = 0; i < this.villageGroupData.length; i++) {
					if (data == this.villageGroupData[i].o_locationno) {
						this.ruleForm.VillageGroupDESC = this.villageGroupData[i].o_locationdesc;

					}
				}

			},
			GetLocationInit(id, type) {
				var data = {
					Locationno: id,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
					this[type]=res;
				})
				.catch((error) => {
					this.tableData = [];
					console.log(error)
				})
			},
			addTableItem() { //添加项目
				this.fly2_dialogForm = '';
				this.dialogTitle = '添加农村信息数据项';
				this.fly2_dialogType = 'add';
				this.showFlag = true;
			},
			closeDialog() { //关闭弹出框
				this.GetJBQKDCBItemInit();
			},
			showStudescode(data) { //监听弹出框是关还是闭
			   this.showFlag = data;
               this.GetJBQKDCBItemInit();
			  
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
								id: self.ruleForm.Village,
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
							this.submitLoad=false;
							if (self.dialogType == 'add') {
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
				//
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
</style>
