<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form   :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
					<el-form-item label="名称:" >
						<el-input v-model="ruleForm.MC" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="隶属关系:" >
						<el-input v-model="ruleForm.DJ" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="结构类型:" >
						<el-input v-model="ruleForm.JGLX" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="规格型号:" >
						<el-input v-model="ruleForm.JGSL" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="数量:" >
						<el-input v-model="ruleForm.SL" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="容量:" >
						<el-input v-model="ruleForm.RL" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="备注:" >
						<el-input type="textarea"  :rows="5" v-model="ruleForm.BZ" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					
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
		AddSpecialprojects_SUB,
		EditSpecialprojects_SUB
	} from '@/api'
	
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo','BaseType'])
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
				project1:'',
				postionArry:[],
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
		components: {},
		props: ['dialogType', 'dialogForm', 'dialogTable', 'typeName'],
		mounted: function() {

			console.log(this.dialogForm);
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.ruleForm=this.dialogForm;
				this.project1=this.dialogForm.value;
				if(this.dialogType == 'look'){
					this.disabled = true;
				}
				
			}
            
		},

		methods: {
			submitForm(formName) { //表单提交按钮
				var self = this;
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.submitLoad=true;
						
						if (self.dialogType == 'edit') {
							var data = {
								id: self.dialogForm.KeyNo,
								JsonStr:JSON.stringify(self.ruleForm)   
							};
							var url = EditSpecialprojects_SUB;
						} else {
							var data = {
								id: self.KeyNo,
								TypeName: self.typeName,
								JsonStr:JSON.stringify(self.ruleForm)   
							};
							var url = AddSpecialprojects_SUB ;
						}
						url(data).then((res) => {
							this.submitLoad=false;
							this.$message({
								message: '操作成功',
								type: 'success',
								center: true
							})
							self.$emit('showStudes',false);
							
						}).catch((res) => {
							this.submitLoad=false;
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
		height:60vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}

	
</style>
