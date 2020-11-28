<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-form-item label="地区类型:" prop="stationName">
						<el-select v-model="ruleForm.tableIndex" filterable placeholder="请选择调查表类型" @change="change_tableType" class="input-200">
							<el-option key="1" label="水库淹没区" value="1"></el-option>
							<el-option key="2" label="水库影响区" value="2"></el-option>
							<el-option key="3" label="枢纽工程建设区" value="3"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="高程范围:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-90"></el-input>
						<span>---</span>
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-90"></el-input>
					</el-form-item>
					<el-form-item label="户主姓名:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>

					<el-form-item label="家庭人口:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="家庭住址:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-500"></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="stationName">
						<el-input v-model="ruleForm.stationName" type="textarea" :disabled="dialogType=='look'?true:false" class="input-500"></el-input>
					</el-form-item>



				</el-form>
                <div class="margin-top-l text-center " v-show="dialogType!='look'">
                		<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="loading">{{loading===false?'提交':'提交中'}}</el-button>
                </div>
			</div>
			
		</div>
	</div>
</template>

<script>
	// import axios from 'axios'
	export default {
		name: 'huxinxidiaocha_fly_add',
		data: function() {
			return {
				ruleForm: {
					stationName: '',
				},
				loading: false,
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
				this.disabled = true;
			}

		},

		methods: {
			change_tableType(data) { //选择表类型

			},
			submitForm(formName) { //表单提交按钮
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
		height:450px;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
