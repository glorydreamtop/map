<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
					<el-row :gutter="20">
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="影响线段名称:">
								<el-input v-model="ruleForm.YXXDMC" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="单位:">
								<el-input v-model="ruleForm.Unit" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="起讫点及长度:">
								<el-input v-model="ruleForm.QQDJCD" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="导线型号及截面积:">
								<el-input v-model="ruleForm.DXXH" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="供电范围:">
								<el-input v-model="ruleForm.GDFW" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
						</el-col>
						<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
							<el-form-item label="运行管理机构:">
								<el-input v-model="ruleForm.YXGLJG" :disabled="dialogType=='look'?true:false"></el-input>
								<!-- <el-cascader v-model="ruleForm.YXGLJG" filterable clearable  ref="cascaderAddr"  :options="postionArry" :props="defaultProps" @change="postionChange"></el-cascader> -->
								<!-- <el-input v-model="ruleForm.stationName" :disabled="dialogType=='look'?true:false"></el-input> -->
							</el-form-item>
							<el-form-item label="杆塔材质及数量:">
								<el-input v-model="ruleForm.GTCZJSL" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="高程分布:">
								<el-input v-model="ruleForm.GCFB" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="敷设方式:">
								<el-input v-model="ruleForm.FSFS" :disabled="dialogType=='look'?true:false"></el-input>
							</el-form-item>
							<el-form-item label="其他:">
								<el-input v-model="ruleForm.QT" :disabled="dialogType=='look'?true:false"></el-input>
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
					<el-button class="button-l" type="primary" plain @click="submitForm('ruleForm')" :loading="submitLoad">{{submitLoad===false?'提交':'提交中'}}</el-button>
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
		GetJBQKDCBItems,
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
