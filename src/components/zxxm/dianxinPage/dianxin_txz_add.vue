<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="名称:">
								<el-input v-model="ruleForm.MC" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="权属:">
								<el-input v-model="ruleForm.QS" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="建成时间:">
								<el-input v-model="ruleForm.JCSJ" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="结构类型:">
								<el-input v-model="ruleForm.JGLX" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="占地面积:">
								<el-input v-model="ruleForm.ZDMJ" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="等级:">
								<el-input v-model="ruleForm.DJ" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="规模:">
								<el-input v-model="ruleForm.GM" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="地点:">
								<el-input v-model="ruleForm.DD" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="结构数量:">
								<el-input v-model="ruleForm.JGSL" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="数量:">
								<el-input v-model="ruleForm.SL" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							<el-form-item label="备注:">
								<el-input type="textarea" :rows="5" v-model="ruleForm.BZ" :disabled="dialogType=='look'?true:false"></el-input>
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
					VirtualitemName: '',
					VirtualitemDesc: '',
					Unit: '',
					AttrNum: '',
					Remarks: '',
				},
				project1: '',
				postionArry: [],
				submitLoad: false,
				disabled: false,
				rules: { //约定的验证规则
					stationName: [{
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
		dialogType: {
			handler: function(val, oldval) {
				this.dialogType = val;
				this.init();
			},
			deep: true //
		},
		activated() {

		},
		components: {},
		props: ['dialogType', 'dialogForm', 'dialogTable', 'typeName'],
		mounted: function() {
			
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

	.input-595 {
		width: 595px;
	}
</style>
