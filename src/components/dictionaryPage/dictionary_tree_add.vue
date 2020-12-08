<template>
	<div id="element_add">
		<div class="element_main">
			<div class="reyuan_form">
				<el-form label-position="top"  :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
					<el-form-item label="分类编码:" >
						<el-input v-model="ruleForm.AttrNum" :disabled="dialogType=='look'?true:false"></el-input>
					</el-form-item>
					<el-form-item label="分类描述:" >
						<el-input type="textarea"  :rows="5" v-model="ruleForm.Remarks" :disabled="dialogType=='look'?true:false"></el-input>
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
		GetJBQKDCBItems,AddBaseTablesListAttrs,UpdateBaseTablesListAttrs
	} from '@/api'
	
	export default {
		name: 'jbqk_table1_add_two',
		computed: {
			...mapGetters(['KeyNo','BaseType'])
		},
		data: function() {
			return {
				ruleForm: {
					AttrNum: '',
					Remarks: '',
				},
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
		props: ['dialogType', 'dialogForm','dialogTable'],
		mounted: function() {
			console.log(this.dialogForm);
			if (this.dialogType == 'edit' || this.dialogType == 'look') {
				this.ruleForm=this.dialogForm;
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
							var url = UpdateBaseTablesListAttrs;
						} else {
							var data = {
								id: self.KeyNo,
								BaseType: self.BaseType,
								JsonStr:JSON.stringify(self.ruleForm)   
							};
							var url = AddBaseTablesListAttrs;
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
		height:38vh;
		margin: 0%;
		overflow-y: auto;
		overflow-x: hidden;

	}

	
</style>
