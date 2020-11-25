<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form label-position="top" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="编号:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>

					<el-form-item label="项目:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="单位:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="数量:" prop="stationName">
						<el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="stationName">
						<el-input type="textarea" v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					
				</el-form>
                <div class="dialog_foot" v-show="dialogType!='look'">
                	<span class="btn_foot">
                		<el-button  class="button-l" type="primary" plain @click="submitForm2('ruleForm')" :loading="loading">{{loading===false?'提交':'提交中'}}</el-button>
                	</span>
                </div>
			</div>
			
		</div>
	
	</div>
</template>

<script>
	// import axios from 'axios'
	export default {
		name: 'jbqk_table1_add_two',
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

	
</style>
