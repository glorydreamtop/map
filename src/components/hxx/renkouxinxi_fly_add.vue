<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">

					<el-form-item label="姓名:" prop="XM">
						<el-input v-model="ruleForm.XM" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>

					<el-form-item label="与户主关系:" prop="YHZGX">
						<el-input v-model="ruleForm.YHZGX" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="性别:" prop="XB">
						<el-select v-model="ruleForm.XB" filterable placeholder="请选择性别" class="input-200" :disabled="dialogType=='look'?true:false">
							<el-option key="1" label="男" value="男"></el-option>
							<el-option key="2" label="女" value="女"></el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="民族:" prop="MZ">
						<el-input v-model="ruleForm.MZ" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="出生年月:" prop="CSNY">
						<el-date-picker v-model="ruleForm.CSNY" type="date" placeholder="请选择出生年月" :disabled="dialogType=='look'?true:false"
						 class="input-200" value-format="yyyy-MM-dd"> </el-date-picker>
					</el-form-item>
					<el-form-item label="身份证号码:" prop="SFZH">
						<el-input v-model="ruleForm.SFZH" :disabled="dialogType=='look'?true:false" class="input-200" ></el-input>
					</el-form-item>
					<el-form-item label="文化程度:" prop="WHCD">
						<el-select v-model="ruleForm.WHCD" filterable placeholder="请选择文化程度" class="input-200" :disabled="dialogType=='look'?true:false">
							<el-option key="1" label="初中及以下" value="初中及以下"></el-option>
							<el-option key="2" label="高中" value="高中"></el-option>
							<el-option key="3" label="大专" value="大专"></el-option>
							<el-option key="4" label="本科" value="本科"></el-option>
							<el-option key="5" label="研究生" value="研究生"></el-option>
							<el-option key="6" label="博士" value="博士"></el-option>
						</el-select>
						
					</el-form-item>
					<el-form-item label="从事职业:" prop="CSZY">
						<el-input v-model="ruleForm.CSZY" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="户籍性质:" prop="HKXZ">
						<el-input v-model="ruleForm.HKXZ" :disabled="dialogType=='look'?true:false" class="input-200"></el-input>
					</el-form-item>
					<el-form-item label="户口所在地:" prop="HKSZD">
						<el-input v-model="ruleForm.HKSZD" :disabled="dialogType=='look'?true:false" class="input-500"></el-input>
					</el-form-item>
					<el-form-item label="备注:" prop="BZ">
						<el-input v-model="ruleForm.BZ" type="textarea" :disabled="dialogType=='look'?true:false" class="input-500"></el-input>
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
	import {
		AddHousehold_Sub,
		EditHousehold_Sub
	} from '@/api';
	import {
		mapGetters
	} from 'vuex';
	export default {
		name: 'huxinxidiaocha_fly_add',
		computed: {
			...mapGetters(['householdId'])
		},
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
			console.log(this.dialogType)
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.disabled = true;
				this.ruleForm=this.dialogForm;
				console.log(this.ruleForm)
			}

		},

		methods: {
			change_tableType(data) { //选择表类型

			},
			submitForm(formName) { //表单提交按钮
				var self = this;
				self.loading = true;
				this.$refs[formName].validate((valid) => {
					// alert(1);
					var self = this;
					if (valid) {
						if (self.dialogType == 'edit') {
							var url = EditHousehold_Sub;
							var data = {
								id: self.dialogForm.KeyNo,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						} else {
							var url = AddHousehold_Sub;
							var data = {
								TypeName: '人口信息',
								id: self.householdId,
								JsonStr: JSON.stringify(self.ruleForm)
							}
						}
                        console.log(data);
						url(data).then((res) => {
							self.loading = false;
							self.$emit('showStudes', false);
							self.$message({
								message: '操作成功',
								type: 'success',
								center: true,

							});
						}).catch((res) => {
							console.log(res)
							self.loading = false;
							this.$message({
								message: '操作失败，请确定后提交',
								type: 'error',
								center: true
							})
						})
					} else {

						self.loading = false;
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
		height: 60vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
