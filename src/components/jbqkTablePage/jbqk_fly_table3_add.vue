<template>
	<div id="element_add">
		<!--员工弹出框-->
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">

					<!-- 农村基本情况调查表 -->
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
						
						<el-form-item label="项目名称:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	
						<el-form-item label="项目类别:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	
						<el-form-item label="项目规划情况:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	
						<el-form-item label="项目规模:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	
						<el-form-item label="功能:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	
						<el-form-item label="服务对象:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	
						<!-- <el-form-item label="作用:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	 -->
						<el-form-item label="受影响程度:" prop="stationName">
							<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
						</el-form-item>	
						<!-- <el-form-item label="数据项:" prop="stationCode">
							<el-button size="mini" @click="addTableItem">添加</el-button>
							<div class="addTable" v-if="ruleForm.itemList.length!=0">
								<div class="tableHeader">
									<span class="cell_row1">项目</span>
									<span class="cell_row2">单位</span>
									<span class="cell_row3">备注</span>
								</div>
								<div class="tableBody">
									<div class="table_row" v-for="(item,index) in ruleForm.itemList">
										<span class="cell_row1 rowInput"  @mouseenter="mouseEnter(index)" @mouseleave="mouseLeave(index)">
											<input v-model="item.itemName"/>
											 <i class="el-icon-close shopClose"  @click="delShopItem(index,item)" v-show="seenButton&&currentIndex==index"></i>
										</span>
										<span class="cell_row2 rowInput">
											<input v-model="item.unit"/>
										</span>
										<span class="cell_row3 rowInput">
											<input v-model="item.remark"/>
										</span>
									</div>
								</div>
							</div>
						</el-form-item>
					 -->
					
				</el-form>

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
				ruleForm: {
					tableIndex:'1',
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
					itemList:[],
					
				},
				seenButton:false,
				currentIndex:0,
				tableData:[],
				loading:false,
				disabled:false,
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
			change_tableType(data){//选择表类型
				
			},
			addTableItem(){//添加项目
				this.ruleForm.itemList.push(
				{itemName:'',unit:'',remark:''}
				)
			},
			delShopItem(index,item){//删除项目
			   this.ruleForm. itemList.splice((index),1);
			},
			mouseEnter(index){//移入
			  console.log('移入')
			  this.seenButton = true;
			  this.currentIndex = index;
			},
			mouseLeave(index){//移出
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
	.addTable{
		color: white;
		border: 1px solid #4cf0ff;
	}
	.tableHeader,.table_row{
		display: flex;
		/* height: 4vh; */
	}
	.table_row{
		border-bottom: 1px solid #4cf0ff;
	}
	/* .tableBody{
		height: 20vh;
		overflow-y: auto;
	} */
	.table_row:last-child {
		border-bottom:none;
	}
	.tableHeader{
		border-bottom: 1px solid #4cf0ff;
	}
	.rowInput input{
		width: 100%;
		display: inline-block;
		height: 4vh;
		border: none;
		outline:none;
		background: #233b50;
		color: white;
		text-align: center;
		
		
	}
	.cell_row1{
		display: inline-block;
		width: 40%;
		text-align: center;
		border-right:1px solid #4cf0ff ;
		position: relative;
	}
	.cell_row2{
		display: inline-block;
		width: 20%;
		text-align: center;
		border-right:1px solid #4cf0ff ;
	}
	.cell_row3{
		display: inline-block;
		width: 40%;
		text-align: center;
	}
</style>
