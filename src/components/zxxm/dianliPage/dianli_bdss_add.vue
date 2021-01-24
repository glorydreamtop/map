<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="formNew">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="名称:" prop="MC">
								<el-input v-model="ruleForm.MC" placeholder="请输入名称"></el-input>
							</el-form-item>
							<el-form-item label="权属部门:" prop="stationName">
								<el-input v-model="ruleForm.QS" placeholder="请输入名称"></el-input>
							
							</el-form-item>
							<el-form-item label="电压等级:" prop="stationName">
								<el-input v-model="ruleForm.DYDJ" placeholder="请输入电压等级"></el-input>
							</el-form-item>
							<el-form-item label="供电范围:" prop="stationName">
								<el-input v-model="ruleForm.GDFW" placeholder="请输入供电范围"></el-input>
							</el-form-item>
							<el-form-item label="出线间隔:" prop="stationName">
								<el-input v-model="ruleForm.CXJG" placeholder="请输入出线间隔"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="地点:" prop="stationName">
								<el-input v-model="ruleForm.DD" placeholder="请输入地点"></el-input>
							</el-form-item>
							<el-form-item label="主管部门:" prop="stationName">
								<el-input v-model="ruleForm.ZGBM" placeholder="请输入名称"></el-input>
							</el-form-item>
							<el-form-item label="容量:" prop="stationName">
								<el-input v-model="ruleForm.RL" placeholder="请输入容量"></el-input>
							</el-form-item>
							<el-form-item label="建成年月:" prop="stationName">
								<el-date-picker v-model="ruleForm.JCNY" type="date" placeholder="请选择日期">
								</el-date-picker>
							</el-form-item>
							<el-form-item label="其他:" prop="stationName">
								<el-input v-model="ruleForm.QT" placeholder=""></el-input>
							</el-form-item>
							
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="备注:">
								<el-input type="textarea"  :rows="5" v-model="ruleForm.Remarks" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>

				<div class="margin-top-l text-center " v-show="dialogType!='look'">
					<el-button class="button-l" type="primary" @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
				</div>
			</div>

		</div>

	</div>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	import {
		AddSpecialprojects_SUB,
		EditSpecialprojects_SUB
	} from '@/api'

	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo', 'BaseType'])
		},
		data: function() {
			return {
				ruleForm: {
					Remarks: '',
				},
				project1: '',
				postionArry: [],
				submitLoad: false,
				disabled: false,
				rules: { //约定的验证规则
					MC: [{
						required: true,
						message: '请填写名称',
						trigger: 'blur'
					}, ],

				},
				defaultProps: {
					children: 'children',
					label: 'label',

				}

			}
		},
		components: {},
		props: ['dialogType', 'dialogForm', 'dialogTable','typeName'],
		mounted: function() {
			
			console.log(this.dialogType,this.typeName);
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.ruleForm = this.dialogForm;
				this.project1 = this.dialogForm.value;
				if (this.dialogType == 'look') {
					this.disabled = true;
				}

			}

		},

		methods: {
			
			submitForm(formName) { //表单提交按钮
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoad = true;

						if (self.dialogType == 'edit') {
							var data = {
								id: self.dialogForm.KeyNo,
								JsonStr: JSON.stringify(self.ruleForm)
							};
							var url = EditSpecialprojects_SUB;
						} else {
							var data = {
								id: self.KeyNo,
								TypeName: self.typeName,
								JsonStr: JSON.stringify(self.ruleForm)
							};
							var url = AddSpecialprojects_SUB;
						}
						url(data).then((res) => {
							this.submitLoad = false;
							this.$message({
								message: '操作成功',
								type: 'success',
								center: true
							})
							self.$emit('showStudes', false);

						}).catch((res) => {
							this.submitLoad = false;
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
		height: 55vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}
</style>
