<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<div class="formeHeader">
							<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
								<el-form-item label="地区类型:" prop="Region">
									<el-select v-model="ruleForm.Region" filterable :disabled="disabled"  placeholder="请选择地区类型" @change="change_tableType" class="input-200">
										<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
										<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
										<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="区县:" prop="stationName">
									<el-select v-model="ruleForm.County" filterable :disabled="disabled" placeholder="请选择区县" @change="change_county" class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
										</el-option>
									</el-select>

								</el-form-item>

								<el-form-item label="乡镇:" prop="stationName">
									<el-select v-model="ruleForm.Town" filterable :disabled="disabled" placeholder="请选择区县" @change="change_town" class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in townData">
										</el-option>
									</el-select>

								</el-form-item>
								<el-form-item label="村民委:" prop="stationName">
									<el-select v-model="ruleForm.Village" filterable :disabled="disabled" placeholder="请选择区县" @change="change_village" class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in villageData">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="村民小组:" prop="stationName">
									<el-select v-model="ruleForm.VillageGroup" filterable :disabled="disabled" placeholder="请选择区县" @change="change_VillageGroup"  class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in villageGroupData">
										</el-option>
									</el-select>
								</el-form-item>
				
							</el-form>
							<div class="dialog_foot" v-show="dialogType!='look'&&!disabled">
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
	  listToTree
	} from '@/utils/treeUtil.js'
	import {
		GetLocations,
		GetBaseTablesListAttrs,
		AddBaseTablesBaseAttrs,
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
					County: '',
					Town: '',
					Village:'',
					VillageGroup:'',
					Region:'',
	
				},
				Keyno:'',//表头编号
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
		mounted() {
			console.log(this.dialogForm, '传参')
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.ruleForm=this.dialogForm;
				this.KeyNo=this.dialogForm.KeyNo;
				this.$store.commit('jbqk/set_KeyNo',this.dialogForm.KeyNo)
				this.GetLocationInit(0,'countyData'); //获取区县
				this.GetLocationInit(this.dialogForm.County,'townData'); //获取乡镇
				this.GetLocationInit(this.dialogForm.Town,'villageData'); //获取村委
				this.GetLocationInit(this.dialogForm.Village,'villageGroupData'); //获取村委组
				this.GetJBQKDCBItemInit(); //获取数据项
			}else{
				this.GetLocationInit(0,'countyData'); //获取地区
			}
		},
		created() {
		},

		methods: {
			GetJBQKDCBItemInit() {//获取数据项
			console.log(this.KeyNo)
				var data = {id: this.KeyNo};
				GetBaseTablesListAttrs(data).then((res) => {
						
						 this.tableItemData = listToTree(res, 'VirtualitemName', 'ParentVirtualitemName');
						 console.log(res, this.tableItemData, '获取数据项')
						// this.tableItemData=res;
						// this.tableData = res;
					})
					.catch((error) => {
						this.tableItemData = [];
						console.log(error)
					})
			},
			change_county(data) {//选中区县,获取乡镇
			    for(var i=0;i<this.countyData.length;i++){
					if(data==this.countyData[i].o_locationno){
						this.ruleForm.CountyDESC=this.countyData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data,'townData'); //获取乡镇
			},
			change_town(data) {//选中乡镇,获取村委
				for(var i=0;i<this.townData.length;i++){
					if(data==this.townData[i].o_locationno){
						this.ruleForm.TownDESC=this.townData[i].o_locationdesc;
					}
				}
				this.GetLocationInit(data,'villageData'); //获取村委
			},
			change_village(data){//选中村委,获取村委组
				for(var i=0;i<this.villageData.length;i++){
					if(data==this.villageData[i].o_locationno){
						this.ruleForm.VillageDESC=this.villageData[i].o_locationdesc;
					}
				}
			  this.GetLocationInit(data,'villageGroupData'); //获取村委组
			},
			change_VillageGroup(data){//选中村委组
				for(var i=0;i<this.villageGroupData.length;i++){
					if(data==this.villageGroupData[i].o_locationno){
						this.ruleForm.VillageGroupDESC=this.villageGroupData[i].o_locationdesc;
					}
				}
			  
			},
			GetLocationInit(id,type) {
				var data = {
					Locationno: id,
					ProjectNo: this.projectNo
				};
				GetLocations(data).then((res) => {
					if(type=='countyData'){
						this.countyData=res;
					}else if(type=='townData'){
						this.townData=res;
					}else if(type=='villageData'){
						this.villageData=res;
					}else if(type=='villageGroupData'){
						this.villageGroupData=res;
					}
						// this[`type`]=res;
						// this.countyData=res;
						// this.$set(this[`type`],1,res)
						// console.log(type,res)
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
               this.GetJBQKDCBItemInit();
			},
			showStudescode(data) { //监听弹出框是关还是闭

			},
			submitForm(formName) { //表单提交按钮
				this.$refs[formName].validate((valid) => {
					// alert(1);
					var self = this;
					if (valid) {
						var data = {
							ProjectNo: self.projectNo,
							BaseType: this.BaseType,
							id:self.ruleForm.Village,
							JsonStr:JSON.stringify(self.ruleForm)
						   
						};
                           // self.ruleForm.ProjectNo=self.ProjectNo;
						 
							if (self.dialogType == 'add') {//添加时候先获取编号
								var url=AddBaseTablesBaseAttrs;
							} else {
								// var url = exchStationAdd;
							}
												//
							url(data).then((res) => {
								this.KeyNo=res[0].Keyno;
								this.disabled=true;
								console.log(res,'添加表头成功',this.$store.state.KeyNo);
								this.$store.commit('jbqk/set_KeyNo',res[0].Keyno)
								
								
							}).catch((res) => {
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
