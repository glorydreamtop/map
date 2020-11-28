<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					
					<el-form-item label="姓名:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>

					<el-form-item label="与户主关系:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="性别:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="民族:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="出生年月:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="身份证号码:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="文化程度:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="从事职业:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="户籍性质:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="户口所在地:" prop="stationName">
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
		height:550px;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
