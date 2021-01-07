<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-collapse v-model="activeFormIndex">
					<el-collapse-item title="表基础信息" name="1">
						<div class="formeHeader">
							<el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
								<el-form-item label="工程类型:" prop="Region">
									<el-select v-model="ruleForm.Region" filterable :disabled="disabled" placeholder="请选择工程类型" 
									 class="input-200">
										<el-option key="1" label="水库淹没区" value="水库淹没区"></el-option>
										<el-option key="2" label="水库影响区" value="水库影响区"></el-option>
										<el-option key="3" label="枢纽工程建设区" value="枢纽工程建设区"></el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="高程范围:">
									<el-input v-model="ruleForm.AltitudeStart" :disabled="disabled" class="input-90"></el-input>
									<span>---</span>
									<el-input v-model="ruleForm.AltitudeEnd" :disabled="disabled" class="input-90"></el-input>
								</el-form-item>
								<el-form-item label="区县:" >
									<el-select v-model="ruleForm.County" filterable :disabled="disabled" placeholder="请选择区县" @change="change_county"
									 class="input-200">
										<el-option :key="item.o_locationno" :label="item.o_locationdesc" :value="item.o_locationno" v-for="item in countyData">
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
							<el-button title="修改"  @click="editTableItem" size="mini" icon="el-icon-edit" plain></el-button>
							<el-button title="删除" @click="delTableItem" size="mini" icon="el-icon-delete" plain></el-button>
							<el-table :data="tableItemData" highlight-current-row border style="width: 100%" class="margin-top-m"  :row-class-name="tableRowClassName" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" row-key="value"
							 default-expand-all @row-click="rowClick">
								<el-table-column prop="value" label="项目编码" align="center"></el-table-column>
								<el-table-column prop="label" label="项目" width="150" align="center"></el-table-column>
								<el-table-column prop="Target" label="指标" width="80" align="center"></el-table-column>
								<el-table-column prop="Remarks" label="备注" align="center"></el-table-column>
							</el-table>
						</div>
			
			
					</el-collapse-item>
					<el-collapse-item title="相关文档" name="3" v-if="KeyNo">
						
						<files :id="KeyNo" />
					</el-collapse-item>
				</el-collapse>
			
				<el-dialog :title="dialogTitle"  :append-to-body="true" @close='closeDialog' :visible.sync="showFlag" v-model="showFlag"
				 class="newStyleDialog " custom-class="jbqk_add2_table1_dialog">
					<programHeaderAdd :dialog-type="fly2_dialogType"  :dialog-table="tableItemData"  v-on:showStudes="showStudescode" :dialog-form="fly2_dialogForm" v-if="showFlag"></programHeaderAdd>
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
		GetSerialNumber,
		DeleteBaseTablesAttr
	} from '@/api'
	import files from "@/components/files"
	import programHeaderAdd from './program_item_add' 
	export default {
		name: 'jbqk_table1_add',
		components: {programHeaderAdd,files},
		computed: {
			...mapGetters(['projectNo','BaseType','KeyNo'])
		},
		data: function() {
			return {
				activeFormIndex:'1',
				ruleForm: {
				},
				dialogTitle:'',
				fly2_dialogType:'',
				fly2_dialogForm:'',
				showFlag:false,
				countyData:[],//地区数据
				seenButton: false,
				currentIndex: 0,
				tableData: [],
				submitLoad: false,
				disabled: false,
				tableItemData:[],
				rules: { //约定的验证规则
					stationName: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],
					
				},

			}
		},
		
		props: ['dialogType', 'dialogForm'],
		mounted: function() {
			console.log(this.dialogForm, '传参')
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				if (this.dialogType == 'look') {
					this.disabled = true;
				}
				this.ruleForm = this.dialogForm;
				this.$store.commit('jbqk/set_KeyNo', this.dialogForm.KeyNo)
				this.GetLocationInit(0, 'countyData'); //获取区县
				this.GetJBQKDCBItemInit(); //获取数据项
			} else {
				this.$store.commit('jbqk/set_KeyNo', '')
				this.GetLocationInit(0, 'countyData'); //获取地区
			}

		},

		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				  return row.ClassName;
			},
			GetJBQKDCBItemInit() {//获取数据项
			    console.log(this.KeyNo)
				var data = {id: this.KeyNo};
				GetBaseTablesListAttrs(data).then((res) => {
						 this.tableItemData = res;
						 console.log(res, this.tableItemData, '获取数据项')
				})
				.catch((error) => {
					this.tableItemData = [];
					console.log(error)
				})
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
					this[type]=res;
				})
				.catch((error) => {
					this.tableData = [];
					console.log(error)
				})
			},
			change_county(data) { //选中区县,获取乡镇
				for (var i = 0; i < this.countyData.length; i++) {
					if (data == this.countyData[i].o_locationno) {
						this.ruleForm.CountyDESC = this.countyData[i].o_locationdesc;
					}
				}
			},
			addTableItem() { //添加项目
				this.fly2_dialogForm = '';
				this.dialogTitle = '添加专业项目信息数据项';
				this.fly2_dialogType = 'add';
				this.showFlag = true;
			},
			editTableItem(){//添加
				if(this.fly2_dialogForm){
					this.dialogTitle = '修改专业项目信息数据项';
					this.fly2_dialogType = 'edit';
					this.showFlag = true;
				}else{
					this.$message({
						message: '请选择要编辑的数据项',
						type: 'error',
						center: true
					})
				}
				
			},
			delTableItem(){//删除
			console.log(this.fly2_dialogForm)
			    if(this.fly2_dialogForm){
					var self=this;
					this.$confirm('此操作将永久删除, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						center: true,
						type: 'warning'
					}).then(() => {
						DeleteBaseTablesAttr({id:this.fly2_dialogForm.KeyNo}).then((res) => {
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
				}else{
					this.$message({
						message: '请选择要删除的数据项',
						type: 'error',
						center: true
					})
				}
				
			},
			rowClick(row, column){//单击表格一行
				console.log(row, column);
				if(row.ClassName=="singleitem"){
					this.fly2_dialogForm=row;	
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
